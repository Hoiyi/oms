package com.hu.operation.duty.service;

import com.hu.sysManagement.system.domain.User;

import java.util.List;

public interface MonthDutyService {
    List<String> list(int paramInt);

    User getDutyEmp(int paramInt);

    User getNextDutyEmp(int paramInt);

    void saveDutyEmp(String paramString, int paramInt);

    void setCurrDuty(int paramInt1, int paramInt2);

    void weekDutyChange();

    void monthDutyChange();

    void sendWeekDutyMail();

    void sendMonthDutyMail();
}