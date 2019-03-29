package com.hu.sysManagement.common.service.impl;

import com.hu.sysManagement.common.dao.DictDao;
import com.hu.sysManagement.common.domain.Dict;
import com.hu.sysManagement.common.service.DictService;
import com.hu.sysManagement.system.domain.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DictServiceImpl
        implements DictService {

    @Autowired
    private DictDao dictDao;

    @Override
    public Dict get(Long id) {
        return dictDao.get(id);
    }

    @Override
    public List<Dict> list(Map<String, Object> map) {
        return dictDao.list(map);
    }

    @Override
    public int count(Map<String, Object> map) {
        return dictDao.count(map);
    }

    @Override
    public int save(Dict dict) {
        return dictDao.save(dict);
    }

    @Override
    public int update(Dict dict) {
        return dictDao.updatePj(dict);
    }

    @Override
    public int remove(Long id) {
        return dictDao.remove(id);
    }

    @Override
    public int batchRemove(Long[] ids) {
        return dictDao.batchRemove(ids);
    }

    @Override
    public List<Dict> listType() {
        return dictDao.listType();
    }

    @Override
    public String getName(String type, String value) {
        HashMap<String, Object> param = new HashMap<String, Object>(16);
        param.put("type", type);
        param.put("value", value);
        String rString = ((Dict) dictDao.list(param).get(0)).getName();
        return rString;
    }

    @Override
    public List<Dict> getHobbyList(User user) {
        Map param = new HashMap(16);
        param.put("type", "hobby");
        List<Dict> hobbyList = dictDao.list(param);

        if (StringUtils.isNotEmpty(user.getHobby())) {
            String[] userHobbys = user.getHobby().split(";");
            for (String userHobby : userHobbys) {
                for (Dict hobby : hobbyList) {
                    if (Objects.equals(userHobby, hobby.getId().toString())) {
                        hobby.setRemarks("true");
                        break;
                    }
                }
            }
        }
        return hobbyList;
    }

    @Override
    public List<Dict> getSexList() {
        Map param = new HashMap(16);
        param.put("type", "sex");
        return dictDao.list(param);
    }

    @Override
    public List<Dict> listByType(String type) {
        Map param = new HashMap(16);
        param.put("type", type);
        return dictDao.list(param);
    }
}