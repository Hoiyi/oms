package com.hu.sysManagement.common.service.impl;

import com.hu.sysManagement.common.dao.PlatformDao;
import com.hu.sysManagement.common.domain.Platform;
import com.hu.sysManagement.common.service.PlatformService;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.system.dao.MenuDao;
import com.hu.sysManagement.system.domain.Menu;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PlatformServiceImpl
        implements PlatformService {

    @Autowired
    private PlatformDao platformDao;

    @Autowired
    private MenuDao menuDao;

    @Override
    public List<Platform> list(Map<String, Object> map) {
        return platformDao.list(map);
    }

    @Override
    public int count(Map<String, Object> map) {
        return platformDao.count(map);
    }

    @Override
    public int save(Platform platform) {
        Menu menu = new Menu();
        menu.setParentId(Long.valueOf(106L));
        menu.setName(platform.getPlatDes());
        menu.setGmtCreate(new Date());
        menu.setIcon(platform.getIcon());
        menu.setType(Integer.valueOf(0));
        menuDao.save(menu);

        platform.setMenuId(menu.getMenuId());

        platformDao.insert(platform);

        menu.setOrderNum(Integer.valueOf(platform.getPlatId().intValue()));

        return menuDao.updatePj(menu);
    }

    @Override
    public Platform findById(Long platId) {
        return (Platform) platformDao.selectById(platId);
    }

    @Override
    public int update(Platform platform) {
        Menu menu = menuDao.get(platform.getMenuId());

        menu.setName(platform.getPlatDes());
        menu.setIcon(platform.getIcon());
        menu.setGmtModified(new Date());
        menuDao.updatePj(menu);

        return platformDao.updateById(platform).intValue();
    }

    @Override
    public Result remove(Long platId) {
        Platform platform = (Platform) platformDao.selectById(platId);

        Map params = new HashMap();
        params.put("parentId", platform.getMenuId());
        List menus = menuDao.list(params);
        if ((menus != null) && (menus.size() > 0)) {
            return Result.error(1, "平台下存在系统，不可删除");
        }
        if (platformDao.deleteById(platId).intValue() > 0) {
            menuDao.remove(platform.getMenuId());
            return Result.ok();
        }
        return Result.error();
    }
}