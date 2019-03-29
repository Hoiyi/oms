package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

@Data
@TableName("sys_user_role")
public class UserRole {

    @TableId
    private Long id;
    private Long userId;
    private Long roleId;

}