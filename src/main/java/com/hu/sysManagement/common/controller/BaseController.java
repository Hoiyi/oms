package com.hu.sysManagement.common.controller;

import com.hu.sysManagement.common.utils.ShiroUtils;
import com.hu.sysManagement.system.domain.User;
import org.springframework.stereotype.Controller;

@Controller
public class BaseController {
    public User getUser() {
        return ShiroUtils.getUser();
    }

    public Long getUserId() {
        return getUser().getUserId();
    }

    public String getUsername() {
        return getUser().getUsername();
    }
}