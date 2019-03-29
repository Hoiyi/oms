package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("login_log")
public class LoginLog implements Serializable {
    private static final long serialVersionUID = 1L;

    @TableId
    private Long loginId;
    private Long userId;
    private Date loginTime;
    private Date logoutTime;
    private String loginIp;
    private String remark;

}