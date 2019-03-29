package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

@Data
@TableName("sys_role_menu")
public class RoleMenu {

    @TableId
    private Long id;
    private Long roleId;
    private Long menuId;

}