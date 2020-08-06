# ssoadmin
* 后台地址: http://127.0.0.1/oms/login 后台管理系统平台<br/>
* 主要技术开发人员：<a href="https://www.jianshu.com/u/8a60edacc192">H.<br/>
* 测试账号：admin/123456
## 系统更新
* 无
## 主要功能
* 比较懒<br/>

## 技术框架
* 核心框架：`SpringBoot`
* 安全框架：`Shiro`
* 持久层框架：`MyBatis-plus + Mybaits3`
* 视图框架：`Spring MVC`
* 定时器：`Quartz`
* 数据库连接池：`Druid`
* 日志管理：`SLF4J`、`Log4j`
* 前端框架：`bootstrap`
* 热部署：`jrebel`

### 开发环境
建议开发者使用以下环境，这样避免版本带来的问题
* IDE:`idea`
* DB:`mysql`
* JDK:`JAVA 8`
* WEB:<del>Tomcat8+</del> （采用springboot框架开发时,并没有用到额外的tomcat 用的框架自带的）
* Maven:`Maven3.0+`

# 运行环境
* WEB服务器：`Tomcat` 、`JBoss`、`Jetty` 等
* 数据库服务器：`Oralce`
* 操作系统：`Windows`、`Linux`

#本地部署
* 1.git下载<a href="https://github.com/Hoiyi/oms.git">https://github.com/Hoiyi/oms.git项目，完成后导入到ide中
* 2.eclipse File import... Maven Existing Projects into Workspace 选择项目的根路径
* 3.IDE会下载maven依赖包，自动编译，如果有报错，请update project... jdk环境配置
* 4.husvn.sql文件，初始化数据【按需导入表结构】
* 5.最后修改数据库连接参数配置文件,配置文件在src/main/resources/application-dev.yml
* 6.druid可视化界面地址：http://127.0.0.1/oms/druid/index.html
* 7.么得了，不懂得简书私信下我：https://www.jianshu.com/u/8a60edacc192

## 登录
![登录](https://images.gitee.com/uploads/images/2020/0806/132536_b58623ae_1647553.png)
##
![登录](https://images.gitee.com/uploads/images/2020/0806/132536_9d6f3bfd_1647553.png)
