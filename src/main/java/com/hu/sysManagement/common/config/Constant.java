package com.hu.sysManagement.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Constant {
    public static final Long DEPT_ROOT_ID = Long.valueOf(0L);
    public static String companyName;
    public static long sessionTimeout;
    public static String defaultPassword;
    public static String charset;
    public static String suffix;
    public static String generateMode;
    public static String account;
    public static String password;
    public static String smtpServer;

    @Value("${hu.mail.generate-mode}")
    public void setGenerateMode(String generateMode) {
        Constant.generateMode = generateMode;
    }

    @Value("${hu.mail.suffix}")
    public void setSuffix(String suffix) {
        Constant.suffix = suffix;
    }

    @Value("${hu.mail.account}")
    public void setAccount(String account) {
        Constant.account = account;
    }

    @Value("${hu.mail.password}")
    public void setPassword(String password) {
        Constant.password = password;
    }

    @Value("${hu.mail.smtp-server}")
    public void setSmtpServer(String smtpServer) {
        Constant.smtpServer = smtpServer;
    }

    @Value("${hu.company-name}")
    public void setCompanyName(String companyName) {
        Constant.companyName = companyName;
    }

    @Value("${server.session-timeout}")
    public void setSessionTimeout(long sessionTimeout) {
        Constant.sessionTimeout = sessionTimeout;
    }

    @Value("${hu.default-password}")
    public void setDefaultPassword(String defaultPassword) {
        Constant.defaultPassword = defaultPassword;
    }

    @Value("${hu.charset}")
    public void setCharset(String charset) {
        Constant.charset = charset;
    }
}