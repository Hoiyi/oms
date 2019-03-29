package com.hu.sysManagement.common.service;

import com.hu.sysManagement.common.domain.Dict;
import com.hu.sysManagement.system.domain.User;

import java.util.List;
import java.util.Map;

public interface DictService {
    Dict get(Long paramLong);

    List<Dict> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int save(Dict paramDict);

    int update(Dict paramDict);

    int remove(Long paramLong);

    int batchRemove(Long[] paramArrayOfLong);

    List<Dict> listType();

    String getName(String paramString1, String paramString2);

    List<Dict> getHobbyList(User paramUser);

    List<Dict> getSexList();

    List<Dict> listByType(String paramString);
}