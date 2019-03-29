package com.hu.operation.duty.domain;

import lombok.Data;

@Data
public class DutyOrder {
    private Integer id;
    private String nameOrder;
    private Integer dutyNumber;
    private Integer dutyTypeId;
    private Integer flag;
}