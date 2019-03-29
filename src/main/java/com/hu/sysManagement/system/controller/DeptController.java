package com.hu.sysManagement.system.controller;

import com.hu.sysManagement.common.config.Constant;
import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.domain.Tree;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.system.domain.Dept;
import com.hu.sysManagement.system.service.DeptService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping({"/sys/dept"})
public class DeptController extends BaseController {
    private String prefix = "sysManagement/system/dept";

    @Autowired
    private DeptService deptService;

    @Autowired
    private BeanFilter<Dept> filter;

    @GetMapping
    @RequiresPermissions({"sys:dept:dept"})
    String dept(Model model) {
        model.addAttribute("topNode", Constant.companyName);
        return prefix + "/dept";
    }

    @ResponseBody
    @GetMapping({"/list"})
    @RequiresPermissions({"sys:dept:dept"})
    public List<Dept> list() {
        Map query = new HashMap(16);
        List sysDeptList = deptService.list(query);
        return sysDeptList;
    }

    @ResponseBody
    @GetMapping({"/getById/{pId}"})
    @RequiresPermissions({"sys:dept:dept"})
    public Dept getById(@PathVariable("pId") Long pId) {
        return deptService.get(pId);
    }

    @PostMapping({"/exist"})
    @ResponseBody
    boolean exist(@RequestParam Map<String, Object> params) {
        return deptService.count(BeanFilter.clearSpace(params)) <= 0;
    }

    @ResponseBody
    @PostMapping({"/save"})
    @RequiresPermissions({"sys:dept:add"})
    public Result save(Dept sysDept) {
        filter.clearSpace(sysDept);
        if (deptService.save(sysDept) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @RequestMapping({"/update"})
    @RequiresPermissions({"sys:dept:edit"})
    public Result update(Dept sysDept) {
        filter.clearSpace(sysDept);
        if (deptService.update(sysDept) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @PostMapping({"/remove"})
    @ResponseBody
    @RequiresPermissions({"sys:dept:remove"})
    public Result remove(Long deptId) {
        Map map = new HashMap();
        map.put("parentId", deptId);
        if (deptService.count(map) > 0) {
            return Result.error(1, "包含下级部门,不允许删除");
        }
        if (deptService.checkDeptHasUser(deptId)) {
            if (deptService.remove(deptId) > 0) {
                return Result.ok();
            }
        } else {
            return Result.error(1, "部门包含用户,不允许删除");
        }
        return Result.error();
    }

    @GetMapping({"/tree"})
    @ResponseBody
    public Tree<Dept> tree() {
        Tree tree = new Tree();
        tree = deptService.getTree();
        return tree;
    }

    @GetMapping({"/treeView"})
    String treeView() {
        return prefix + "/deptTree";
    }

    @GetMapping({"/permsView"})
    String permsView() {
        return prefix + "/permsTree";
    }
}