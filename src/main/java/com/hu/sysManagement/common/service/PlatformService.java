package com.hu.sysManagement.common.service;

import com.hu.sysManagement.common.domain.Platform;
import com.hu.sysManagement.common.utils.Result;

import java.util.List;
import java.util.Map;

public interface PlatformService {
    List<Platform> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int save(Platform paramPlatform);

    Platform findById(Long paramLong);

    int update(Platform paramPlatform);

    Result remove(Long paramLong);
}