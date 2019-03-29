package com.hu.operation.duty.domain;

import lombok.Data;

import java.util.Date;

@Data
public class DutyRecord {
    private Integer id;
    private Long dutyEmpId;
    private Integer dutyTypeId;
    private Date startdate;
    private Date enddate;

}