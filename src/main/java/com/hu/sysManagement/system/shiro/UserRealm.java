package com.hu.sysManagement.system.shiro;

import com.hu.sysManagement.common.config.ApplicationContextRegister;
import com.hu.sysManagement.common.config.Constant;
import com.hu.sysManagement.common.utils.ShiroUtils;
import com.hu.sysManagement.system.domain.User;
import com.hu.sysManagement.system.service.MenuService;
import com.hu.sysManagement.system.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;

public class UserRealm extends AuthorizingRealm {
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        System.out.println(111);
        Long userId = ShiroUtils.getUserId();
        MenuService menuService = (MenuService) ApplicationContextRegister.getBean(MenuService.class);
        Set perms = menuService.listPerms(userId);
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setStringPermissions(perms);
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = (String) token.getPrincipal();
        Map map = new HashMap(16);
        map.put("username", username);
        String password = new String((char[]) token.getCredentials());

        UserService userService = (UserService) ApplicationContextRegister.getBean(UserService.class);

        List users = userService.userList(map);
        User user = null;
        if (users.size() > 0) {
            user = (User) users.get(0);
        }

        if (user == null) {
            throw new UnknownAccountException("账号或密码不正确");
        }

        Session session = ShiroUtils.getSession();
        session.setAttribute("userId", user.getUserId());

        if (!password.equals(user.getPassword())) {
            throw new IncorrectCredentialsException("账号或密码不正确");
        }

        if (user.getStatus().intValue() == 0) {
            throw new LockedAccountException("账号已被锁定,请联系管理员");
        }
        session.setTimeout(Constant.sessionTimeout);
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        return info;
    }
}