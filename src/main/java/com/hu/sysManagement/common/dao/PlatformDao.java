package com.hu.sysManagement.common.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.sysManagement.common.domain.Platform;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PlatformDao extends BaseMapper<Platform> {
    List<Platform> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);
}