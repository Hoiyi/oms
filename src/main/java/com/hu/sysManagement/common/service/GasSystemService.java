package com.hu.sysManagement.common.service;

import com.hu.sysManagement.common.domain.GasSystem;
import com.hu.sysManagement.common.utils.Result;

import java.util.List;
import java.util.Map;

public interface GasSystemService {
    List<Map<String, Object>> list(Map<String, Object> paramMap);

    List<GasSystem> GasSystemList(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int save(GasSystem paramGasSystem);

    GasSystem findById(Long paramLong);

    Result update(GasSystem paramGasSystem);

    Result remove(Long paramLong);
}