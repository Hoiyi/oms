package com.hu.operation.duty.service.Impl;

import com.hu.operation.duty.domain.DutyOrder;
import com.hu.operation.duty.service.WeekDutyService;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class WeekDutyServiceImpl implements WeekDutyService {
    @Override
    public List<DutyOrder> list(long DutyTypeId) {
        return null;
    }

    @Override
    public DutyOrder getDutyEmp(long DutyTypeId) {
        return null;
    }

    @Override
    public DutyOrder getNextDutyEmp(long DutyTypeId) {
        return null;
    }

    @Override
    public void addDutyEmp(DutyOrder dutyEmp) {
    }
}