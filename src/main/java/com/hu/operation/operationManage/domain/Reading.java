package com.hu.operation.operationManage.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@TableName("reading")
@Data
public class Reading {
    private static final long serialVersionUID = 1L;

    @TableId
    private Long rId;
    private Long sysId;
    private Long userId;
    private BigDecimal dailyQuantity;
    private BigDecimal readingValue;
    private Integer executeState;
    private Date writeTime;
    private String remarks;
    private Date updateTime;
}