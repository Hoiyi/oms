package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@TableName("sys_role")
public class Role {

    @TableId
    private Long roleId;
    private String roleName;
    private String roleSign;
    private String remark;
    private Long userIdCreate;
    private Date gmtCreate;
    private Date gmtModified;
    private List<Long> menuIds;

}