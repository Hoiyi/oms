package com.hu.sysManagement.common.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hu.knowledge.knowledgeStore.dao.KnowledgeDao;
import com.hu.operation.operationManage.dao.CustomerDao;
import com.hu.operation.operationManage.dao.ReadingDao;
import com.hu.sysManagement.common.dao.GasSystemDao;
import com.hu.sysManagement.common.dao.PlatformDao;
import com.hu.sysManagement.common.domain.GasSystem;
import com.hu.sysManagement.common.domain.Platform;
import com.hu.sysManagement.common.service.GasSystemService;
import com.hu.sysManagement.common.utils.BeanMapConvertUtil;
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
public class GasSystemServiceImpl
        implements GasSystemService {

    @Autowired
    private GasSystemDao gasSystemDao;

    @Autowired
    private MenuDao menuDao;

    @Autowired
    private PlatformDao platformDao;

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private ReadingDao readingDao;

    @Autowired
    private KnowledgeDao knowledgeDao;
    BeanMapConvertUtil<GasSystem> convertUtil = new BeanMapConvertUtil(GasSystem.class);

    @Override
    public int count(Map<String, Object> map) {
        return gasSystemDao.count(map);
    }

    @Override
    public int save(GasSystem gasSystem) {
        int result = gasSystemDao.insert(gasSystem).intValue();

        if ((gasSystem.getGasSystemUse().intValue() == 0) || (gasSystem.getGasSystemUse().intValue() == 3)) {
            return buildMenu(gasSystem);
        }
        return result;
    }

    @Override
    public GasSystem findById(Long sysId) {
        return (GasSystem) gasSystemDao.selectById(sysId);
    }

    @Override
    public Result update(GasSystem gasSystem) {
        Map params = new HashMap();
        params.put("sysId", gasSystem.getSysId());
        int klCount = knowledgeDao.count(params);
        GasSystem old = (GasSystem) gasSystemDao.selectById(gasSystem.getSysId());

        if ((old.getPlatId() != null) && (old.getPlatId() != gasSystem.getPlatId())) {
            if ((klCount > 0) && (old.getGasSystemUse().intValue() == 0)) {
                return Result.error("系统下存在知识库，不能更改所属平台");
            }
            if ((klCount > 0) && (old.getGasSystemUse().intValue() == 3)) {
                return Result.error("系统下存在知识库，不能更改所属平台");
            }

        }

        if ((old.getGasSystemUse() != null) &&
                (old.getGasSystemUse() != gasSystem.getGasSystemUse()) &&
                ((old.getGasSystemUse().intValue() != 0) || (gasSystem.getGasSystemUse().intValue() != 3)) && (
                (old.getGasSystemUse().intValue() != 3) || (gasSystem.getGasSystemUse().intValue() != 0))) {
            int readCount = readingDao.count(params);
            if ((readCount > 0) && ((old.getGasSystemUse().intValue() == 1) || (old.getGasSystemUse().intValue() == 3))) {
                return Result.error("系统下存在点检记录，不能更改系统用途");
            }
            if ((klCount > 0) && ((old.getGasSystemUse().intValue() == 0) || (old.getGasSystemUse().intValue() == 3))) {
                return Result.error("系统下存在知识库，不能更改系统用途");
            }

            if (((old.getGasSystemUse().intValue() == 0) || (old.getGasSystemUse().intValue() == 3)) && (gasSystem.getGasSystemUse().intValue() == 1)) {
                EntityWrapper wrap = new EntityWrapper();
                wrap.eq("parent_id", gasSystem.getMenuId());
                menuDao.delete(wrap);

                menuDao.deleteById(gasSystem.getMenuId());

                if (gasSystemDao.updateById(gasSystem).intValue() > 0) {
                    return Result.ok();
                }
            } else if ((old.getGasSystemUse().intValue() == 1) && ((gasSystem.getGasSystemUse().intValue() == 3) || (gasSystem.getGasSystemUse().intValue() == 0)) &&
                    (buildMenu(gasSystem) > 0)) {
                return Result.ok();
            }
        } else {
            if ((gasSystem.getGasSystemUse().intValue() == 0) || (gasSystem.getGasSystemUse().intValue() == 3)) {
                Platform platform = (Platform) platformDao.selectById(gasSystem.getPlatId());
                Menu gasSysmenu = (Menu) menuDao.selectById(gasSystem.getMenuId());

                gasSysmenu.setParentId(platform.getMenuId());
                gasSysmenu.setGmtModified(new Date());
                gasSysmenu.setName(gasSystem.getSysName());
                menuDao.updateById(gasSysmenu);
            }
            if (gasSystemDao.updateById(gasSystem).intValue() > 0) {
                return Result.ok();
            }
        }
        return Result.error();
    }

    @Override
    public Result remove(Long sysId) {
        GasSystem gasSystem = (GasSystem) gasSystemDao.selectById(sysId);

        Map params = new HashMap();
        params.put("sysId", sysId);

        if ((gasSystem.getGasSystemUse().intValue() == 1) || (gasSystem.getGasSystemUse().intValue() == 3)) {
            List customers = customerDao.list(params);
            if ((customers != null) && (customers.size() > 0)) {
                return Result.error("有客户使用此系统，不能删除");
            }
        }

        if ((gasSystem.getGasSystemUse().intValue() == 0) || (gasSystem.getGasSystemUse().intValue() == 3)) {
            List knowledges = knowledgeDao.list(params);
            if ((knowledges != null) && (knowledges.size() > 0)) {
                return Result.error("系统下存在知识库，不能删除");
            }

            EntityWrapper wrap = new EntityWrapper();
            wrap.eq("parent_id", gasSystem.getMenuId());
            menuDao.delete(wrap);

            menuDao.deleteById(gasSystem.getMenuId());
        }

        if (gasSystemDao.deleteById(sysId).intValue() > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @Override
    public List<Map<String, Object>> list(Map<String, Object> map) {
        return gasSystemDao.list(map);
    }

    @Override
    public List<GasSystem> GasSystemList(Map<String, Object> map) {
        return convertUtil.convert(gasSystemDao.list(map));
    }

    public int buildMenu(GasSystem gasSystem) {
        Platform platform = (Platform) platformDao.selectById(gasSystem.getPlatId());

        Menu menu = new Menu();
        menu.setParentId(platform.getMenuId());
        menu.setName(gasSystem.getSysName());
        menu.setPerms("knowledge:" + gasSystem.getSysId() + ":" + gasSystem.getSysId());
        menu.setUrl("knowledge/knowledgeStore/" + gasSystem.getSysId());
        menu.setGmtCreate(new Date());
        menu.setType(Integer.valueOf(1));
        menu.setOrderNum(Integer.valueOf(gasSystem.getSysId().intValue()));
        menuDao.save(menu);

        Menu addBtn = new Menu();
        addBtn.setParentId(menu.getMenuId());
        addBtn.setName("增加");
        addBtn.setPerms("knowledge:" + gasSystem.getSysId() + ":" + "add");
        addBtn.setGmtCreate(new Date());
        addBtn.setType(Integer.valueOf(2));
        menuDao.save(addBtn);

        Menu editBtn = new Menu();
        editBtn.setParentId(menu.getMenuId());
        editBtn.setName("编辑");
        editBtn.setPerms("knowledge:" + gasSystem.getSysId() + ":" + "edit");
        editBtn.setGmtCreate(new Date());
        editBtn.setType(Integer.valueOf(2));
        menuDao.save(editBtn);

        Menu deleteBtn = new Menu();
        deleteBtn.setParentId(menu.getMenuId());
        deleteBtn.setName("删除");
        deleteBtn.setPerms("knowledge:" + gasSystem.getSysId() + ":" + "remove");
        deleteBtn.setGmtCreate(new Date());
        deleteBtn.setType(Integer.valueOf(2));
        menuDao.save(deleteBtn);

        Menu checkBtn = new Menu();
        checkBtn.setParentId(menu.getMenuId());
        checkBtn.setName("查看");
        checkBtn.setGmtCreate(new Date());
        checkBtn.setType(Integer.valueOf(2));
        menuDao.save(checkBtn);

        gasSystem.setMenuId(menu.getMenuId());
        return gasSystemDao.updateById(gasSystem).intValue();
    }
}