package com.hu.sysManagement.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.sysManagement.system.domain.User;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<User> {
    User get(Long paramLong);

    List<Map<String, Object>> list(Map<String, Object> paramMap);

    List<User> findByIds(Long[] paramArrayOfLong);

    int count(Map<String, Object> paramMap);

    int save(User paramUser);

    int updatePj(User paramUser);

    int remove(Long paramLong);

    int batchRemove(Long[] paramArrayOfLong);

    Long[] listAllDept();
}