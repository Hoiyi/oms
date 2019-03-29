package com.hu.operation.duty.service.Impl;

import com.hu.operation.duty.dao.DutyOrderMapper;
import com.hu.operation.duty.domain.DutyOrder;
import com.hu.operation.duty.domain.DutyOrderExample;
import com.hu.operation.duty.domain.DutyOrderExample.Criteria;
import com.hu.operation.duty.service.HolidayService;

import java.util.List;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service
public class HolidayServiceImpl
        implements HolidayService {

    @Resource
    DutyOrderMapper dutyOrderMapper;

    @Override
    public void saveDutyEmp(String users) {
        DutyOrderExample example = new DutyOrderExample();
        Criteria c = example.createCriteria();
        c.andDutyTypeIdEqualTo(Integer.valueOf(4));

        DutyOrder dutyOrder = (DutyOrder) dutyOrderMapper.selectByExample(example).get(0);

        users = users.replace("&", "\",\"");
        users = users.replace("=", "\": \"");
        users = "{\"" + users + "\"}";
        System.out.println(users);
        dutyOrder.setNameOrder(users);
        dutyOrderMapper.updateByExampleSelective(dutyOrder, example);
    }

    @Override
    public String getDutyEmp() {
        DutyOrderExample example = new DutyOrderExample();
        Criteria c = example.createCriteria();
        c.andDutyTypeIdEqualTo(Integer.valueOf(4));

        DutyOrder dutyOrder = (DutyOrder) dutyOrderMapper.selectByExample(example).get(0);
        String namestr = dutyOrder.getNameOrder();
        return namestr;
    }

    @Override
    public List<DutyOrder> getDuty() {
        DutyOrderExample example = new DutyOrderExample();
        Criteria c = example.createCriteria();
        c.andDutyTypeIdEqualTo(Integer.valueOf(4));

        List<DutyOrder> dutyOrder = dutyOrderMapper.selectByExample(example);
        return dutyOrder;
    }
}