package com.hu.sysManagement.system.controller;

import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.system.domain.Role;
import com.hu.sysManagement.system.service.RoleService;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping({"/sys/role"})
@Controller
public class RoleController extends BaseController {
    String prefix = "sysManagement/system/role";

    @Autowired
    RoleService roleService;

    @Autowired
    private BeanFilter<Role> filter;

    @RequiresPermissions({"sys:role:role"})
    @GetMapping
    String role() {
        return prefix + "/role";
    }

    @RequiresPermissions({"sys:role:role"})
    @GetMapping({"/list"})
    @ResponseBody
    PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);

        List roles = roleService.list(query);
        int total = roleService.count(query);
        PageUtils pageUtil = new PageUtils(roles, total);
        return pageUtil;
    }

    @RequiresPermissions({"sys:role:add"})
    @PostMapping({"/save"})
    @ResponseBody
    Result save(Role role) {
        filter.clearSpace(role);
        role.setUserIdCreate(getUserId());
        role.setGmtCreate(new Date());
        if (roleService.save(role) > 0) {
            return Result.ok();
        }
        return Result.error(1, "保存失败");
    }

    @RequiresPermissions({"sys:role:edit"})
    @PostMapping({"/update"})
    @ResponseBody
    Result update(Role role) {
        filter.clearSpace(role);
        role.setGmtModified(new Date());
        if (roleService.update(role) > 0) {
            return Result.ok();
        }
        return Result.error(1, "保存失败");
    }

    @RequiresPermissions({"sys:role:remove"})
    @GetMapping({"/remove/{roleId}"})
    @ResponseBody
    Result remove(@PathVariable("roleId") Long roleId) {
        return roleService.remove(roleId);
    }

    @PostMapping({"/exist"})
    @ResponseBody
    boolean exist(@RequestParam Map<String, Object> params) {
        return roleService.count(BeanFilter.clearSpace(params)) <= 0;
    }
}