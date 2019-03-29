package com.hu.operation.duty.service.Impl;

import com.hu.operation.duty.dao.DutyOrderMapper;
import com.hu.operation.duty.dao.DutyRecordMapper;
import com.hu.operation.duty.domain.DutyOrder;
import com.hu.operation.duty.domain.DutyOrderExample;
import com.hu.operation.duty.domain.DutyOrderExample.Criteria;
import com.hu.operation.duty.domain.DutyRecord;
import com.hu.operation.duty.service.DutyRecordService;
import com.hu.operation.duty.service.MonthDutyService;
import com.hu.sysManagement.system.domain.User;
import com.hu.sysManagement.system.service.UserService;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service
public class DutyRecordServiceImpl
        implements DutyRecordService {

    @Resource
    MonthDutyService monthDutyService;

    @Resource
    DutyRecordMapper dutyRecordMapper;

    @Resource
    DutyOrderMapper dutyOrderMapper;

    @Resource
    UserService userService;

    @Override
    public void createMonthRecord() {
        User user = monthDutyService.getDutyEmp(3);
        Date date = new Date();

        Calendar ca = Calendar.getInstance();
        ca.set(5, ca.getActualMaximum(5));

        DutyRecord dr = new DutyRecord();
        dr.setDutyEmpId(user.getUserId());
        dr.setDutyTypeId(Integer.valueOf(3));
        dr.setStartdate(date);
        dr.setEnddate(ca.getTime());

        dutyRecordMapper.insert(dr);
    }

    @Override
    public void createWeekRecord() {
        User xinaoUser = monthDutyService.getDutyEmp(1);
        User dianjianUser = monthDutyService.getDutyEmp(2);
        Date date = new Date();

        Calendar c = Calendar.getInstance();
        int day_of_week = c.get(7) - 1;
        if (day_of_week == 0)
            day_of_week = 7;
        c.add(5, -day_of_week + 8);
        Date endDate = c.getTime();

        DutyRecord xinaoDr = new DutyRecord();
        xinaoDr.setDutyEmpId(xinaoUser.getUserId());
        xinaoDr.setDutyTypeId(Integer.valueOf(1));
        xinaoDr.setStartdate(date);
        xinaoDr.setEnddate(endDate);

        DutyRecord dianjianDr = new DutyRecord();
        dianjianDr.setDutyEmpId(dianjianUser.getUserId());
        dianjianDr.setDutyTypeId(Integer.valueOf(2));
        dianjianDr.setStartdate(date);
        dianjianDr.setEnddate(endDate);

        dutyRecordMapper.insert(xinaoDr);
        dutyRecordMapper.insert(dianjianDr);
    }

    @Override
    public void createHolidayRecord() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String nowDate = sdf.format(date);

        Calendar calendar = Calendar.getInstance();
        calendar.add(6, 1);
        Date nextDate = calendar.getTime();

        DutyOrderExample example = new DutyOrderExample();
        Criteria c = example.createCriteria();
        c.andDutyTypeIdEqualTo(Integer.valueOf(4));
        DutyOrder dutyOrder = (DutyOrder) dutyOrderMapper.selectByExample(example).get(0);
        String nameOrders = dutyOrder.getNameOrder();
        nameOrders = nameOrders.substring(2, nameOrders.length() - 3);
        System.out.println("nameOrders=" + nameOrders);

        String[] nameOrder = nameOrders.split("\",\"");

        for (String str : nameOrder) {
            String[] subStr = str.split("\": \"");
            String dateStr = subStr[0];
            String userName = subStr[1];
            System.out.println("dateStr=" + dateStr + "user=" + userName);
            System.out.println("nowDate=" + nowDate);
            if (dateStr.equals(nowDate)) {
                System.out.println("日期匹配");
                HashMap<String, Object> map = new HashMap<>();
                map.put("name", userName);
                List<User> users = userService.userList(map);
                if (users.size() != 0) {
                    User user = (User) users.get(0);

                    DutyRecord holidayDr = new DutyRecord();
                    holidayDr.setDutyEmpId(user.getUserId());
                    holidayDr.setDutyTypeId(Integer.valueOf(4));
                    holidayDr.setStartdate(date);
                    holidayDr.setEnddate(nextDate);
                    dutyRecordMapper.insert(holidayDr);
                }
            }
        }
    }
}