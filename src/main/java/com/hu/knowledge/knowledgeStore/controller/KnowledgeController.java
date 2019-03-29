package com.hu.knowledge.knowledgeStore.controller;

import com.hu.knowledge.knowledgeStore.domain.Knowledge;
import com.hu.knowledge.knowledgeStore.service.KnowledgeService;
import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.domain.GasSystem;
import com.hu.sysManagement.common.service.GasSystemService;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.common.utils.ShiroUtils;
import com.hu.sysManagement.system.domain.Menu;
import com.hu.sysManagement.system.service.MenuService;

import java.util.Date;
import java.util.List;
import java.util.Map;

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
@RequestMapping({"/knowledge/knowledgeStore"})
public class KnowledgeController extends BaseController {
    private String prefix = "knowledge/knowledgeStore";

    @Autowired
    private GasSystemService gasSystemService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private KnowledgeService knowledgeService;

    @Autowired
    private BeanFilter<Knowledge> filter;

    @GetMapping({"/{sysId}"})
    String gasSystem(@PathVariable("sysId") Long sysId, Model model) {
        GasSystem gasSystem = gasSystemService.findById(sysId);
        Menu menu = menuService.get(gasSystem.getMenuId());
        if (!ShiroUtils.isPermitted(menu.getPerms())) {
            return "error/403";
        }

        model.addAttribute("title", gasSystem.getSysName());
        model.addAttribute("add", Boolean.valueOf(ShiroUtils.isPermitted("knowledge:" + sysId + ":add")));
        model.addAttribute("edit", Boolean.valueOf(ShiroUtils.isPermitted("knowledge:" + sysId + ":edit")));
        model.addAttribute("remove", Boolean.valueOf(ShiroUtils.isPermitted("knowledge:" + sysId + ":remove")));
        model.addAttribute("sysId", sysId);
        model.addAttribute("platId", gasSystem.getPlatId());
        return prefix + "/knowledge";
    }

    @GetMapping({"/getById/{klId}"})
    @ResponseBody
    public Knowledge list(@PathVariable("klId") Long klId) {
        return knowledgeService.selectById(klId);
    }

    @GetMapping({"/list"})
    @ResponseBody
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Map<String, Object>> list = knowledgeService.list(query);
        int total = knowledgeService.count(query);

        PageUtils pageUtils = new PageUtils(list, total);
        return pageUtils;
    }

    @PostMapping({"/add"})
    @ResponseBody
    public Result add(Knowledge knowledge, String editorValue) {
        filter.clearSpace(knowledge);

        knowledge.setGmtCreate(new Date());
        knowledge.setContent(editorValue);
        if (knowledgeService.save(knowledge) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @PostMapping({"/update"})
    @ResponseBody
    public Result update(Knowledge knowledge, String editorValue) {
        filter.clearSpace(knowledge);

        knowledge.setGmtModified(new Date());
        knowledge.setContent(editorValue);
        if (knowledgeService.update(knowledge) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @PostMapping({"/remove"})
    @ResponseBody
    public Result remove(Long klId) {
        if (knowledgeService.deleteById(klId) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @PostMapping({"/exist"})
    @ResponseBody
    boolean exist(@RequestParam Map<String, Object> params) {
        return knowledgeService.count(BeanFilter.clearSpace(params)) <= 0;
    }
}