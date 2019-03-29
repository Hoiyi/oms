package com.hu.sysManagement.common.controller;

import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalExcptionHandler {
    @ExceptionHandler({Exception.class})
    public ModelAndView handleOtherExceptions(RuntimeException e, WebRequest req) {
        ModelAndView mv = new ModelAndView();
        if ((e instanceof UnauthorizedException)) {
            mv.setViewName("error/403");
            mv.setStatus(HttpStatus.FORBIDDEN);
            return mv;
        }
        e.printStackTrace();
        mv.setViewName("error/500");
        mv.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return mv;
    }
}