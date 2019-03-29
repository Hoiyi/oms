package com.hu.operation.operationManage.controller;

import com.hu.knowledge.knowledgeStore.domain.Knowledge;
import com.hu.operation.operationManage.domain.Customer;
import com.hu.operation.operationManage.domain.Record;
import com.hu.operation.operationManage.service.RecordService;
import com.hu.sysManagement.common.controller.BaseController;
import com.hu.sysManagement.common.service.DictService;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/operation/record"})
public class RecordContraller extends BaseController {
    Customer customer;

    @Autowired
    DictService dictservice;

    @Autowired
    private RecordService recordService;
    private String prefix = "/operation/record";

    @RequestMapping
    public String record(Model model) {
        model.addAttribute("proState", this.recordService.prostateList());
        model.addAttribute("keyProblem", this.recordService.keyproblemList());
        return "/operation/operationManage/problemReg/record";
    }

    @GetMapping({"/list"})
    @ResponseBody
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Map<String, Object>> list = this.recordService.list(query);
        int total = this.recordService.count(query);
        PageUtils pageUtils = new PageUtils(list, total);
        return pageUtils;
    }

    @GetMapping({"/gaslist"})
    @ResponseBody
    public PageUtils gaslist(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Map<String, Object>> gaslist = this.recordService.gaslist(query);
        int total = this.recordService.count(query);
        PageUtils pageUtils = new PageUtils(gaslist, total);
        return pageUtils;
    }

    @GetMapping({"/queryCname"})
    @ResponseBody
    public List<Customer> queryCname(@RequestParam String customerName) {
        List<Customer> list = this.recordService.queryCusName(customerName);
        return list;
    }

    @GetMapping({"/queryDescribe"})
    @ResponseBody
    public List<Knowledge> queryDescribe(@RequestParam String describe) {
        List<Knowledge> list = this.recordService.queryDescribe(describe);
        return list;
    }

    @ResponseBody
    @PostMapping({"/save"})
    public Result save(Record record) {
        record.setUpdateTime(new Date());

        record.setUserId(getUserId());
        if (this.recordService.save(record) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @PostMapping({"/update"})
    public Result update(Record record) {
        if (this.recordService.update(record) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @GetMapping({"/remove/{reId}"})
    public Result remove(@PathVariable("reId") Long reId) {
        if (this.recordService.remove(reId) > 0) {
            return Result.ok();
        }
        return Result.error();
    }
}