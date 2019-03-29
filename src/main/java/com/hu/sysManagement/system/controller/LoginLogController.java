package com.hu.sysManagement.system.controller;

import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.system.service.LoginLogService;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/sys/loginLog"})
public class LoginLogController extends BaseController {

    @Autowired
    private LoginLogService loginLogService;
    String prefix = "sysManagement/system/loginLog";

    @GetMapping
    String loginLog() {
        return prefix + "/loginLog";
    }

    @RequiresPermissions({"sys:loginLog:loginLog"})
    @RequestMapping({"/list"})
    @ResponseBody
    PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List logs = loginLogService.list(query);
        int total = loginLogService.count(query);
        PageUtils pageUtils = new PageUtils(logs, total);
        return pageUtils;
    }
}