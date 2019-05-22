
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `city_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '城市id',
  `province_id` bigint(20) NULL DEFAULT NULL COMMENT '所属省id',
  `city_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '城市名称',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '城市' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for county
-- ----------------------------
DROP TABLE IF EXISTS `county`;
CREATE TABLE `county`  (
  `county_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '区县id',
  `city_id` bigint(20) NULL DEFAULT NULL COMMENT '所属市id',
  `county_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '区县名称',
  PRIMARY KEY (`county_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '区县' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer_manage
-- ----------------------------
DROP TABLE IF EXISTS `customer_manage`;
CREATE TABLE `customer_manage`  (
  `customer_id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT '自增客户id',
  `customer_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '客户名称',
  `customer_address_p` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '客户地址（省）',
  `customer_address_c` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '客户地址（市）',
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '联系人',
  `contact_information` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '联系方式',
  `responsible_person` int(25) NULL DEFAULT NULL COMMENT '负责人',
  `customer_property` int(1) NULL DEFAULT NULL COMMENT '客户属性',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 97 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '客户管理表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer_sys
-- ----------------------------
DROP TABLE IF EXISTS `customer_sys`;
CREATE TABLE `customer_sys`  (
  `cs_id` int(5) NOT NULL AUTO_INCREMENT COMMENT '客户-系统id',
  `customer_id` int(5) NULL DEFAULT NULL COMMENT '客户id',
  `plat_id` int(5) NULL DEFAULT NULL COMMENT '平台id',
  `sys_id` int(5) NULL DEFAULT NULL COMMENT '系统id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建日期',
  `trainer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '培训人',
  `trainer_time` datetime(0) NULL DEFAULT NULL COMMENT '培训时间',
  `trainer_mode` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '培训方式',
  `sys_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '系统地址',
  `remark` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '备注',
  `is_deleted` int(1) NULL DEFAULT NULL COMMENT '删除标识',
  `state` int(1) NULL DEFAULT NULL COMMENT '状态',
  `create_person` bigint(25) NULL DEFAULT NULL COMMENT '创建人',
  `update_reason` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '修改人',
  PRIMARY KEY (`cs_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '客户-系统表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for data_perm
-- ----------------------------
DROP TABLE IF EXISTS `data_perm`;
CREATE TABLE `data_perm`  (
  `data_perms_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '数据权限id',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `perms_user_id` bigint(20) NULL DEFAULT NULL COMMENT '可查看的用户id',
  PRIMARY KEY (`data_perms_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 381 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '数据权限' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for district
-- ----------------------------
DROP TABLE IF EXISTS `district`;
CREATE TABLE `district`  (
  `dist_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '区域id',
  `dist_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '片区名称',
  `dist_des` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '片区描述',
  `principal_id` bigint(20) NULL DEFAULT NULL COMMENT '片区负责人',
  `prefecture` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '辖区',
  PRIMARY KEY (`dist_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '片区' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for duty_order
-- ----------------------------
DROP TABLE IF EXISTS `duty_order`;
CREATE TABLE `duty_order`  (
  `id` int(255) NOT NULL COMMENT '值班id',
  `name_order` varchar(9999) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '值班顺序',
  `duty_number` int(255) NOT NULL COMMENT '当前值班人员序号',
  `duty_type_id` int(255) NOT NULL COMMENT '值班类型，关联duty_type表',
  `flag` int(255) NOT NULL COMMENT '值班人员个数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '值班顺序' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for duty_record
-- ----------------------------
DROP TABLE IF EXISTS `duty_record`;
CREATE TABLE `duty_record`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '值班记录id',
  `duty_emp_id` bigint(255) NOT NULL COMMENT '值班人员id，关联user表',
  `duty_type_id` int(255) NOT NULL COMMENT '值班类型id，关联duty_type表',
  `startdate` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `enddate` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 68 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '值班记录' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for duty_type
-- ----------------------------
DROP TABLE IF EXISTS `duty_type`;
CREATE TABLE `duty_type`  (
  `ID` bigint(100) NOT NULL COMMENT '值班类型id',
  `TYPE_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '值班类型名称',
  `DUTY_CIRCLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '值班周期',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '值班类型' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for gas_system
-- ----------------------------
DROP TABLE IF EXISTS `gas_system`;
CREATE TABLE `gas_system`  (
  `sys_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT ' 系统id',
  `sys_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '系统名称',
  `gmt_create` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime(0) NULL DEFAULT NULL COMMENT '更改时间',
  `first_dept_id` bigint(20) NULL DEFAULT NULL COMMENT '一级部门',
  `second_dept_id` bigint(20) NULL DEFAULT NULL COMMENT '二级部门',
  `plat_id` bigint(20) NULL DEFAULT NULL COMMENT '所属平台id',
  `menu_id` bigint(20) NULL DEFAULT NULL COMMENT '对应菜单id',
  `gas_system_use` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for knowledge
-- ----------------------------
DROP TABLE IF EXISTS `knowledge`;
CREATE TABLE `knowledge`  (
  `kl_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '知识库id',
  `kl_class_id` bigint(20) NULL DEFAULT NULL COMMENT '知识库大类id',
  `describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '知识库描述',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '知识库内容',
  `gmt_create` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `sys_id` bigint(20) NOT NULL COMMENT '所属系统',
  `plat_id` bigint(20) NULL DEFAULT NULL COMMENT '所属平台',
  PRIMARY KEY (`kl_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '知识库' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for knowledge_class
-- ----------------------------
DROP TABLE IF EXISTS `knowledge_class`;
CREATE TABLE `knowledge_class`  (
  `kl_class_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '知识库大类id',
  `kl_class_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '知识库大类名称',
  `plat_id` bigint(20) NULL DEFAULT NULL COMMENT '所属平台',
  `creater` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`kl_class_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '知识库大类' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log`  (
  `login_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '登陆日志id',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `login_time` datetime(0) NULL DEFAULT NULL COMMENT '登陆时间',
  `logout_time` datetime(0) NULL DEFAULT NULL COMMENT '退出时间',
  `login_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT 'ip',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`login_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1087962616954232911 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '登陆日志' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for platform
-- ----------------------------
DROP TABLE IF EXISTS `platform`;
CREATE TABLE `platform`  (
  `plat_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '平台id',
  `plat_des` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '描述',
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  `menu_id` bigint(20) NULL DEFAULT NULL COMMENT '关联到菜单id',
  `icon` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '图标',
  PRIMARY KEY (`plat_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '平台' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for province
-- ----------------------------
DROP TABLE IF EXISTS `province`;
CREATE TABLE `province`  (
  `province_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '省id',
  `province_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '省名称',
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '省' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for reading
-- ----------------------------
DROP TABLE IF EXISTS `reading`;
CREATE TABLE `reading`  (
  `r_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sys_id` bigint(20) NULL DEFAULT NULL COMMENT '关联到系统id',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '关联到用户人id',
  `daily_quantity` decimal(20, 2) NULL DEFAULT NULL COMMENT '用气量',
  `reading_value` decimal(5, 2) NULL DEFAULT NULL COMMENT '抄表率',
  `execute_state` int(2) NULL DEFAULT NULL COMMENT '调价状态',
  `write_time` datetime(0) NULL DEFAULT NULL COMMENT '登记时间',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`r_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 320 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '点检表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `re_id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT '问题登记ID',
  `user_id` bigint(255) NULL DEFAULT NULL,
  `waste_time` bigint(25) NULL DEFAULT NULL COMMENT '耗时',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `responsible_person` int(255) NULL DEFAULT NULL,
  `pro_type` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '问题类型ID',
  `kl_class` bigint(255) NULL DEFAULT NULL,
  `pro_describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '问题描述',
  `key_problem` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '重点问题',
  `pro_state` bigint(25) NULL DEFAULT NULL COMMENT '状态',
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  `knowledge_id` bigint(25) NULL DEFAULT NULL,
  `sys_id` bigint(25) NULL DEFAULT NULL COMMENT '使用系统',
  `customer_id` bigint(255) NULL DEFAULT NULL COMMENT '客户名称',
  PRIMARY KEY (`re_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '问题登记' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `parent_id` bigint(20) NULL DEFAULT NULL COMMENT '上级部门ID，一级部门为0',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门名称',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '排序',
  `del_flag` tinyint(4) NULL DEFAULT 0 COMMENT '是否删除  -1：已删除  0：正常',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '部门管理' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '字典id',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '标签名',
  `value` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '数据值',
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '类型',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '描述',
  `sort` decimal(10, 0) NULL DEFAULT NULL COMMENT '排序（升序）',
  `parent_id` bigint(20) NULL DEFAULT 0 COMMENT '父级编号',
  `create_by` bigint(20) NULL DEFAULT NULL COMMENT '创建者',
  `create_date` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) NULL DEFAULT NULL COMMENT '更新者',
  `update_date` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注信息',
  `use_flag` tinyint(4) NULL DEFAULT 0 COMMENT '启用标志，标记此选项是否被选中(用于系统配置)，而不是是否可用',
  `del_flag` tinyint(4) NULL DEFAULT NULL COMMENT '删除标志',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sys_dict_value`(`value`) USING BTREE,
  INDEX `sys_dict_label`(`name`) USING BTREE,
  INDEX `sys_dict_del_flag`(`use_flag`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 156 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '字典表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '功能id',
  `parent_id` bigint(20) NULL DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单URL',
  `perms` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  `type` int(11) NULL DEFAULT NULL COMMENT '类型   0：目录   1：菜单   2：按钮',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '排序',
  `gmt_create` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `menu_sign` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单标识',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 416 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '菜单管理' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `role_sign` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色标识',
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `user_id_create` bigint(255) NULL DEFAULT NULL COMMENT '创建用户id',
  `gmt_create` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 83 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `role_id` bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NULL DEFAULT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14547 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色与菜单对应关系' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `dept_id` bigint(20) NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `status` tinyint(255) NULL DEFAULT NULL COMMENT '状态 0:禁用，1:正常',
  `user_id_create` bigint(255) NULL DEFAULT NULL COMMENT '创建用户id',
  `gmt_create` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `sex` bigint(32) NULL DEFAULT NULL COMMENT '性别',
  `birth` datetime(0) NULL DEFAULT NULL COMMENT '出身日期',
  `pic_id` bigint(32) NULL DEFAULT NULL,
  `live_address` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '现居住地',
  `hobby` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '爱好',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省份',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在城市',
  `district` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在地区',
  `homepage` bigint(20) NULL DEFAULT NULL COMMENT '登陆后跳转的页面',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '登录人' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
  `role_id` bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 478 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户与角色对应关系' ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
