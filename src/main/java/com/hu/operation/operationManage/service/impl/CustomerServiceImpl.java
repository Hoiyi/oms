package com.hu.operation.operationManage.service.impl;

import com.hu.operation.operationManage.dao.CustomerDao;
import com.hu.operation.operationManage.domain.Customer;
import com.hu.operation.operationManage.domain.CustomerSys;
import com.hu.operation.operationManage.service.CustomerService;
import com.hu.sysManagement.common.dao.DictDao;
import com.hu.sysManagement.common.domain.Dict;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerDao customerMapper;

    @Autowired
    DictDao dictDao;

    @Override
    public List<Customer> AllCustomers() {
        return customerMapper.AllCustomers();
    }

    @Override
    public List<Map<String, Object>> list(Map<String, Object> map) {
        return customerMapper.list(map);
    }

    @Override
    public int count(Map<String, Object> map) {
        return customerMapper.count(map);
    }

    @Override
    public int save(Customer customer) {
        return customerMapper.save(customer);
    }

    @Override
    public int updateC(Customer customer) {
        return customerMapper.updateC(customer);
    }

    @Override
    public int delete(Integer csId) {
        return customerMapper.updateDel(csId);
    }

    @Override
    public int find(Integer customerAddressP) {
        return customerMapper.find(customerAddressP);
    }

    @Override
    public List<Dict> stateList() {
        Map<String, Object> param = new HashMap<>(16);
        param.put("type", "cus_state");
        return dictDao.list(param);
    }

    @Override
    public List<Dict> propertyList() {
        Map<String, Object> param = new HashMap<>(16);
        param.put("type", "cus_property");
        return dictDao.list(param);
    }

    @Override
    public List<CustomerSys> customerSyslist() {
        return customerMapper.customerSyslist();
    }

    @Override
    public int updateCS(CustomerSys customerSys) {
        return customerMapper.updateCS(customerSys);
    }

    @Override
    public int saveCS(CustomerSys customerSys) {
        return customerMapper.saveCS(customerSys);
    }
}