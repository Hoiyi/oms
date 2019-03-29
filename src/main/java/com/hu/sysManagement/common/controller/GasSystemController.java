package com.hu.sysManagement.common.controller;

import com.hu.sysManagement.common.domain.GasSystem;
import com.hu.sysManagement.common.service.DictService;
import com.hu.sysManagement.common.service.GasSystemService;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;

import java.util.Date;
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
@RequestMapping({"/common/gasSystem"})
public class GasSystemController extends BaseController {

    @Autowired
    private GasSystemService gasSystemService;
    private String prefix = "sysManagement/common/gasSystem";

    @Autowired
    private BeanFilter<GasSystem> filter;

    @Autowired
    DictService dictService;

    @GetMapping
    @RequiresPermissions({"common:gasSystem:gasSystem"})
    String gasSystem(Model model) {
        model.addAttribute("gasSystemUseList", this.dictService.listByType("gasSystemUse"));
        return this.prefix + "/gasSystem";
    }

    @ResponseBody
    @GetMapping({"/gassysList"})
    public List<Map<String, Object>> gassysList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = this.gasSystemService.list(new HashMap<>());

        return list;
    }

    @GetMapping({"/list"})
    @ResponseBody
    @RequiresPermissions({"common:gasSystem:gasSystem"})
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Map<String, Object>> list = this.gasSystemService.list(query);
        int total = this.gasSystemService.count(query);

        PageUtils pageUtils = new PageUtils(list, total);
        return pageUtils;
    }

    @ResponseBody
    @PostMapping({"/save"})
    @RequiresPermissions({"common:gasSystem:add"})
    public Result save(GasSystem gasSystem) {
        this.filter.clearSpace(gasSystem);
        gasSystem.setGmtCreate(new Date());
        if (this.gasSystemService.save(gasSystem) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @PostMapping({"/update"})
    @RequiresPermissions({"common:gasSystem:edit"})
    public Result update(GasSystem gasSystem) {
        this.filter.clearSpace(gasSystem);
        gasSystem.setGmtModified(new Date());

        return this.gasSystemService.update(gasSystem);
    }

    @ResponseBody
    @GetMapping({"/remove/{sysId}"})
    @RequiresPermissions({"common:gasSystem:remove"})
    public Result remove(@PathVariable("sysId") Long sysId) {
        return this.gasSystemService.remove(sysId);
    }

    @PostMapping({"/exist"})
    @ResponseBody
    boolean exist(@RequestParam Map<String, Object> params) {
        return this.gasSystemService.count(BeanFilter.clearSpace(params)) <= 0;
    }
}