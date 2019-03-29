package com.hu.operation.operationManage.controller;

import com.hu.operation.operationManage.domain.Customer;
import com.hu.operation.operationManage.domain.CustomerSys;
import com.hu.operation.operationManage.domain.Record;
import com.hu.operation.operationManage.service.CustomerService;
import com.hu.operation.operationManage.service.RecordService;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;
import com.hu.sysManagement.common.utils.ShiroUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
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
@RequestMapping({"/operation/customermanage"})
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    RecordService recordService;

    @RequiresPermissions({"operation:customer:customer"})
    @RequestMapping({""})
    public String gohtml(Model model) {
        model.addAttribute("cusState", customerService.stateList());
        model.addAttribute("cusProperty", customerService.propertyList());
        return "operation/operationManage/customerManage/CustomerManage";
    }

    @ResponseBody
    @GetMapping({"/customerlist"})
    public List<Customer> customerlist() {
        return customerService.AllCustomers();
    }

    @ResponseBody
    @GetMapping({"/customerSyslist"})
    public List<CustomerSys> customerSyslist() {
        return customerService.customerSyslist();
    }

    @ResponseBody
    @GetMapping({"/list"})
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Map<String, Object>> list = customerService.list(query);
        int total = customerService.count(query);
        PageUtils pageUtils = new PageUtils(list, total);
        return pageUtils;
    }

    @RequiresPermissions({"operation:customer:add"})
    @ResponseBody
    @PostMapping({"/save"})
    public Result save(@RequestParam Map<String, Object> params) {
        String customerId = (String) params.get("customerId");
        Session session = ShiroUtils.getSession();
        int saveC = 0;
        int saveCS = 0;
        int saveR = 0;
        if ((customerId == null) || (customerId == "")) {
            Customer customer = new Customer();
            customer.setContact((String) params.get("contact"));
            customer.setCreateTime(new Date());
            customer.setContactInformation((String) params.get("contactInformation"));
            customer.setCustomerAddressC((String) params.get("customerAddressC"));
            customer.setCustomerAddressP((String) params.get("customerAddressP"));
            customer.setCustomerName((String) params.get("customerName"));
            customer.setCustomerProperty(Integer.valueOf(Integer.parseInt((String) params.get("customerProperty"))));
            customer.setResponsiblePerson(Integer.valueOf(Integer.parseInt((String) params.get("responsiblePerson"))));
            saveC = customerService.save(customer);
            CustomerSys customerSys = new CustomerSys();
            customerSys.setCustomerId(customer.getCustomerId());
            customerSys.setPlatId(Integer.valueOf(Integer.parseInt((String) params.get("platId"))));
            customerSys.setSysId(Integer.valueOf(Integer.parseInt((String) params.get("sysId"))));
            customerSys.setCreateTime(new Date());
            customerSys.setTrainer((String) params.get("trainer"));
            customerSys.setTrainerMode((String) params.get("trainerMode"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                customerSys.setTrainerTime(sdf.parse((String) params.get("trainerTime")));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            customerSys.setSysUrl((String) params.get("sysUrl"));
            customerSys.setRemark((String) params.get("remark"));
            customerSys.setIsDeleted(Integer.valueOf(0));
            customerSys.setState(Integer.valueOf(Integer.parseInt((String) params.get("state"))));
            customerSys.setCreatePerson((Long) session.getAttribute("userId"));
            customerSys.setUpdateReason((String) params.get("updateReason"));
            saveCS = customerService.saveCS(customerSys);
            Record record = new Record();
            record.setCustomerId(new Long(customer.getCustomerId().intValue()));
            record.setUserId((Long) session.getAttribute("userId"));
            record.setWasteTime(Long.valueOf(1L));
            record.setUpdateTime(new Date());
            record.setResponsiblePerson(Integer.valueOf(Integer.parseInt((String) params.get("responsiblePerson"))));
            record.setProType(Long.valueOf(3L));
            record.setProDescribe("新建公司");
            record.setKeyProblem(Long.valueOf(0L));
            record.setProState(Long.valueOf(1L));
            record.setMessage((String) params.get("remark"));
            record.setSysId(Long.valueOf(Long.parseLong((String) params.get("sysId"))));
            saveR = recordService.save(record);
        } else {
            CustomerSys customerSys = new CustomerSys();
            customerSys.setCustomerId(Integer.valueOf(Integer.parseInt(customerId)));
            customerSys.setPlatId(Integer.valueOf(Integer.parseInt((String) params.get("platId"))));
            customerSys.setSysId(Integer.valueOf(Integer.parseInt((String) params.get("sysId"))));
            customerSys.setCreateTime(new Date());
            customerSys.setTrainer((String) params.get("trainer"));
            customerSys.setTrainerMode((String) params.get("trainerMode"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                customerSys.setTrainerTime(sdf.parse((String) params.get("trainerTime")));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            customerSys.setSysUrl((String) params.get("sysUrl"));
            customerSys.setRemark((String) params.get("remark"));
            customerSys.setIsDeleted(Integer.valueOf(0));
            customerSys.setState(Integer.valueOf(Integer.parseInt((String) params.get("state"))));
            customerSys.setCreatePerson((Long) session.getAttribute("userId"));
            customerSys.setUpdateReason((String) params.get("updateReason"));
            saveCS = customerService.saveCS(customerSys);
        }
        if ((saveC > 0) || (saveCS > 0) || (saveR > 0)) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions({"operation:customer:edit"})
    @ResponseBody
    @PostMapping({"/update"})
    public Result update(@RequestParam Map<String, Object> params) {
        Customer customer = new Customer();
        customer.setCustomerId(Integer.valueOf(Integer.parseInt((String) params.get("customerId"))));
        customer.setContact((String) params.get("contact"));
        customer.setContactInformation((String) params.get("contactInformation"));
        customer.setCustomerAddressC((String) params.get("customerAddressC"));
        customer.setCustomerAddressP((String) params.get("customerAddressP"));
        customer.setCustomerName((String) params.get("customerName"));
        customer.setCustomerProperty(Integer.valueOf(Integer.parseInt((String) params.get("customerProperty"))));
        customer.setResponsiblePerson(Integer.valueOf(Integer.parseInt((String) params.get("responsiblePerson"))));
        int updateC = customerService.updateC(customer);
        CustomerSys customerSys = new CustomerSys();
        customerSys.setCsId(Integer.valueOf(Integer.parseInt((String) params.get("csId"))));
        customerSys.setPlatId(Integer.valueOf(Integer.parseInt((String) params.get("platId"))));
        customerSys.setSysId(Integer.valueOf(Integer.parseInt((String) params.get("sysId"))));
        customerSys.setTrainer((String) params.get("trainer"));
        customerSys.setTrainerMode((String) params.get("trainerMode"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            customerSys.setTrainerTime(sdf.parse((String) params.get("trainerTime")));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        customerSys.setSysUrl((String) params.get("sysUrl"));
        customerSys.setRemark((String) params.get("remark"));
        customerSys.setState(Integer.valueOf(Integer.parseInt((String) params.get("state"))));
        customerSys.setUpdateReason((String) params.get("updateReason"));
        int updateCS = customerService.updateCS(customerSys);
        if ((updateC > 0) || (updateCS > 0)) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions({"operation:customer:remove"})
    @ResponseBody
    @PostMapping({"/delete/{csId}"})
    public Result delete(@PathVariable("csId") Integer csId) {
        if (customerService.delete(csId) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @PostMapping({"/find/{customerAddressP}"})
    public int find(@PathVariable("customerAddressP") Integer customerAddressP) {
        return customerService.find(customerAddressP);
    }
}