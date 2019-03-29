package com.hu.sysManagement.system.service;

import com.hu.sysManagement.system.domain.LoginLog;

import java.util.List;
import java.util.Map;

public interface LoginLogService {
    void save(LoginLog paramLoginLog);

    LoginLog getByid(Long paramLong);

    void update(LoginLog paramLoginLog);

    List<Map<String, Object>> list(Map paramMap);

    int count(Map paramMap);
}