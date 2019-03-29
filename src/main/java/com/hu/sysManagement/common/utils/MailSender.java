package com.hu.sysManagement.common.utils;

import com.hu.sysManagement.common.config.Constant;

import java.util.Date;
import java.util.Properties;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailSender {
    public static boolean send(Address[] to, Address[] cc, Address[] bcc, String subject, String body) {
        try {
            Properties props = System.getProperties();
            props.put("mail.host", Constant.smtpServer);
            props.put("mail.smtp.auth", Boolean.valueOf(true));
            Authenticator authenticator = new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(Constant.account, Constant.password);
                }
            };
            Session session = Session.getInstance(props, authenticator);
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(Constant.account));
            message.setSubject(subject);
            message.setRecipients(RecipientType.TO, to);
            message.setRecipients(RecipientType.CC, cc);
            message.setRecipients(RecipientType.BCC, bcc);
            message.setSentDate(new Date());
            message.setText(body);
            Transport.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean send(Address to, Address cc, Address bcc, String subject, String body) {
        try {
            Properties props = System.getProperties();
            props.put("mail.host", Constant.smtpServer);
            props.put("mail.smtp.auth", Boolean.valueOf(true));
            Authenticator authenticator = new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(Constant.account, Constant.password);
                }
            };
            Session session = Session.getInstance(props, authenticator);
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(Constant.account));
            message.setSubject(subject);
            message.setRecipient(RecipientType.TO, to);
            message.setRecipient(RecipientType.CC, cc);
            message.setRecipient(RecipientType.BCC, bcc);
            message.setSentDate(new Date());
            message.setText(body);
            Transport.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}