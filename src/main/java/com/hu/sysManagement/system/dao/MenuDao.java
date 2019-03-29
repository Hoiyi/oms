package com.hu.sysManagement.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.sysManagement.system.domain.Menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuDao extends BaseMapper<Menu> {
    Menu get(Long paramLong);

    List<Menu> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int save(Menu paramMenu);

    int updatePj(Menu paramMenu);

    int remove(Long paramLong);

    int batchRemove(Long[] paramArrayOfLong);

    List<Menu> listMenuByUserId(Long paramLong);

    List<String> listUserPerms(Long paramLong);
}