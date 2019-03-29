package com.hu.sysManagement.common.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.sysManagement.common.domain.GasSystem;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GasSystemDao extends BaseMapper<GasSystem> {
    List<Map<String, Object>> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);
}