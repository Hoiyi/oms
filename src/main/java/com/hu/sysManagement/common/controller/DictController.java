package com.hu.sysManagement.common.controller;

import com.hu.sysManagement.common.domain.Dict;
import com.hu.sysManagement.common.service.DictService;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/common/dict"})
public class DictController extends BaseController {

    @Autowired
    private DictService dictService;
    private String prefix = "sysManagement/common/dict";

    @Autowired
    private BeanFilter<Dict> filter;

    @GetMapping
    @RequiresPermissions({"common:dict:dict"})
    String dict() {
        return this.prefix + "/dict";
    }

    @ResponseBody
    @GetMapping({"/list"})
    @RequiresPermissions({"common:dict:dict"})
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Dict> dictList = this.dictService.list(query);
        int total = this.dictService.count(query);
        PageUtils pageUtils = new PageUtils(dictList, total);
        return pageUtils;
    }

    @ResponseBody
    @PostMapping({"/save"})
    @RequiresPermissions({"common:dict:add"})
    public Result save(Dict dict) {
        this.filter.clearSpace(dict);
        HashMap<String, Object> map = new HashMap<>();
        map.put("validateType", dict.getType());
        map.put("validateValue", dict.getValue());
        if (this.dictService.count(map) > 0) {
            return Result.error("类型：" + dict.getType() + "中已存在" + "数据值：" + dict.getValue());
        }
        if (this.dictService.save(dict) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @RequestMapping({"/update"})
    @RequiresPermissions({"common:dict:edit"})
    public Result update(Dict dict) {
        this.filter.clearSpace(dict);
        Map<String, Object> map = new HashMap<>();
        map.put("validateType", dict.getType());
        map.put("validateValue", dict.getValue());
        map.put("validateId", dict.getId());
        if (this.dictService.count(map) > 0) {
            return Result.error("类型：" + dict.getType() + "中已存在" + "数据值：" + dict.getValue());
        }
        if (this.dictService.update(dict) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping({"/remove/{dictId}"})
    @ResponseBody
    @RequiresPermissions({"common:dict:remove"})
    public Result remove(@PathVariable Long dictId) {
        if (this.dictService.remove(dictId) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping({"/type"})
    @ResponseBody
    public List<Dict> listType() {
        return this.dictService.listType();
    }

    @GetMapping({"/add/{type}/{description}"})
    @RequiresPermissions({"common:dict:add"})
    String addD(Model model, @PathVariable("type") String type, @PathVariable("description") String description) {
        model.addAttribute("type", type);
        model.addAttribute("description", description);
        return this.prefix + "/add";
    }

    @ResponseBody
    @GetMapping({"/list/{type}"})
    public List<Dict> listByType(@PathVariable("type") String type) {
        HashMap<String, Object> map = new HashMap<>(16);
        map.put("type", type);
        List<Dict> dictList = this.dictService.list(map);
        return dictList;
    }
}