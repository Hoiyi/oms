package com.hu.operation.operationManage.domain;

import com.baomidou.mybatisplus.annotations.TableName;

import java.util.Date;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@TableName("customer_sys")
@Data
public class CustomerSys {
    private Integer csId;
    private Integer customerId;
    private Date createTime;
    private Integer state;
    private String updateReason;
    private String trainer;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date trainerTime;
    private String trainerMode;
    private Integer platId;
    private Integer sysId;
    private String sysUrl;
    private String remark;
    private Integer isDeleted;
    private Long createPerson;
}