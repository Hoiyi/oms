package com.hu.sysManagement.system.service.impl;

import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.system.dao.RoleDao;
import com.hu.sysManagement.system.dao.RoleMenuDao;
import com.hu.sysManagement.system.dao.UserDao;
import com.hu.sysManagement.system.dao.UserRoleDao;
import com.hu.sysManagement.system.domain.Role;
import com.hu.sysManagement.system.domain.RoleMenu;
import com.hu.sysManagement.system.service.RoleService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleServiceImpl
        implements RoleService {

    @Autowired
    RoleDao roleMapper;

    @Autowired
    RoleMenuDao roleMenuMapper;

    @Autowired
    UserDao userMapper;

    @Autowired
    UserRoleDao userRoleMapper;

    @Override
    public List<Role> list(Map<String, Object> params) {
        List roles = this.roleMapper.list(params);
        return roles;
    }

    @Override
    public List<Role> list(Long userId) {
        List<Long> rolesIds = this.userRoleMapper.listRoleId(userId);
        List<Role> roles = this.roleMapper.list(new HashMap(16));
        for (Role role : roles) {
            role.setRoleSign("false");
            for (Long roleId : rolesIds) {
                if (Objects.equals(role.getRoleId(), roleId)) {
                    role.setRoleSign("true");
                    break;
                }
            }
        }
        return roles;
    }

    @Transactional
    @Override
    public int save(Role role) {
        int count = this.roleMapper.save(role);
        List<Long> menuIds = role.getMenuIds();
        Long roleId = role.getRoleId();
        List rms = new ArrayList();
        for (Long menuId : menuIds) {
            RoleMenu rm = new RoleMenu();
            rm.setRoleId(roleId);
            rm.setMenuId(menuId);
            rms.add(rm);
        }
        this.roleMenuMapper.removeByRoleId(roleId);
        if (rms.size() > 0) {
            this.roleMenuMapper.batchSave(rms);
        }
        return count;
    }

    @Transactional
    @Override
    public Result remove(Long id) {
        Map params = new HashMap();
        params.put("roleId", id);
        int userCount = this.userRoleMapper.count(params);
        if (userCount > 0) {
            return Result.error("此角色已有用户使用，删除失败");
        }
        int count = this.roleMapper.remove(id);
        this.userRoleMapper.removeByRoleId(id);
        this.roleMenuMapper.removeByRoleId(id);
        if (count > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @Override
    public Role get(Long id) {
        Role role = this.roleMapper.get(id);
        return role;
    }

    @Override
    public int update(Role role) {
        int r = this.roleMapper.updatePj(role);
        List<Long> menuIds = role.getMenuIds();
        Long roleId = role.getRoleId();
        this.roleMenuMapper.removeByRoleId(roleId);
        List rms = new ArrayList();
        for (Long menuId : menuIds) {
            RoleMenu rm = new RoleMenu();
            rm.setRoleId(roleId);
            rm.setMenuId(menuId);
            rms.add(rm);
        }
        if (rms.size() > 0) {
            this.roleMenuMapper.batchSave(rms);
        }
        return r;
    }

    @Override
    public int batchremove(Long[] ids) {
        int r = this.roleMapper.batchRemove(ids);
        return r;
    }

    @Override
    public int count(Map<String, Object> params) {
        return this.roleMapper.count(params);
    }
}