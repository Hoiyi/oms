package com.hu.sysManagement.system.domain;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("sys_menu")
public class Menu
        implements Serializable {
    private static final long serialVersionUID = 1L;

    @TableId
    private Long menuId;
    private Long parentId;
    private String name;
    private String url;
    private String perms;
    private Integer type;
    private String icon;
    private Integer orderNum;
    private Date gmtCreate;
    private Date gmtModified;
    private String menuSign;

}