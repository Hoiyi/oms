package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

@Data
@TableName("data_perm")
public class DataPerm {

    @TableId
    private Long dataPermsId;
    private Long userId;
    private Long permsUserId;
}