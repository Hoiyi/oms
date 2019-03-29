package com.hu.sysManagement.system.controller;

import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.domain.Tree;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.system.domain.Menu;
import com.hu.sysManagement.system.service.MenuService;

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

@RequestMapping({"/sys/menu"})
@Controller
public class MenuController extends BaseController {
    String prefix = "sysManagement/system/menu";

    @Autowired
    MenuService menuService;

    @RequiresPermissions({"sys:menu:menu"})
    @GetMapping
    String menu(Model model) {
        return prefix + "/menu";
    }

    @RequiresPermissions({"sys:menu:menu"})
    @RequestMapping({"/list"})
    @ResponseBody
    List<Menu> list(@RequestParam Map<String, Object> params) {
        List menus = menuService.list(params);
        return menus;
    }

    @RequiresPermissions({"sys:menu:add"})
    @GetMapping({"/add/{pId}"})
    String add(Model model, @PathVariable("pId") Long pId) {
        model.addAttribute("pId", pId);
        if (pId.longValue() == 0L)
            model.addAttribute("pName", "根目录");
        else {
            model.addAttribute("pName", menuService.get(pId).getName());
        }
        return prefix + "/add";
    }

    @RequiresPermissions({"sys:menu:edit"})
    @GetMapping({"/edit/{id}"})
    String edit(Model model, @PathVariable("id") Long id) {
        Menu meun = menuService.get(id);
        Long pId = meun.getParentId();
        model.addAttribute("pId", pId);
        if (pId.longValue() == 0L)
            model.addAttribute("pName", "根目录");
        else {
            model.addAttribute("pName", menuService.get(pId).getName());
        }
        model.addAttribute("menu", meun);
        return prefix + "/edit";
    }

    @RequiresPermissions({"sys:menu:add"})
    @PostMapping({"/save"})
    @ResponseBody
    Result save(Menu menu) {
        if (menuService.save(menu) > 0) {
            return Result.ok();
        }
        return Result.error(1, "保存失败");
    }

    @RequiresPermissions({"sys:menu:edit"})
    @PostMapping({"/update"})
    @ResponseBody
    Result update(Menu menu) {
        if (menuService.update(menu) > 0) {
            return Result.ok();
        }
        return Result.error(1, "更新失败");
    }

    @RequiresPermissions({"sys:menu:remove"})
    @PostMapping({"/remove"})
    @ResponseBody
    Result remove(Long id) {
        if (menuService.remove(id) > 0) {
            return Result.ok();
        }
        return Result.error(1, "删除失败");
    }

    @GetMapping({"/tree"})
    @ResponseBody
    Tree<Menu> tree() {
        Tree tree = menuService.getTree();
        return tree;
    }

    @GetMapping({"/tree/{roleId}"})
    @ResponseBody
    Tree<Menu> tree(@PathVariable("roleId") Long roleId) {
        Tree tree = menuService.getTree(roleId, false);
        return tree;
    }

    @GetMapping({"/disableTree/{roleId}"})
    @ResponseBody
    Tree<Menu> disableTree(@PathVariable("roleId") Long roleId) {
        Tree tree = menuService.getTree(roleId, true);
        return tree;
    }

    @GetMapping({"/iconView"})
    public String iconView() {
        return prefix + "/fontIcoList";
    }
}