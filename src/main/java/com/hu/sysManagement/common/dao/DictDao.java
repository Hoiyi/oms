package com.hu.sysManagement.common.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.sysManagement.common.domain.Dict;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DictDao extends BaseMapper<Dict> {
    Dict get(Long paramLong);

    List<Dict> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int save(Dict paramDict);

    int updatePj(Dict paramDict);

    int remove(Long paramLong);

    int batchRemove(Long[] paramArrayOfLong);

    List<Dict> listType();
}