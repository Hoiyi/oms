package com.hu.operation.duty.service;

import com.hu.operation.duty.domain.DutyOrder;

import java.util.List;

public interface WeekDutyService {
    List<DutyOrder> list(long paramLong);

    DutyOrder getDutyEmp(long paramLong);

    DutyOrder getNextDutyEmp(long paramLong);

    void addDutyEmp(DutyOrder paramDutyOrder);
}