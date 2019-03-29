package com.hu.operation.operationManage.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.operation.operationManage.domain.Customer;
import com.hu.operation.operationManage.domain.CustomerSys;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerDao extends BaseMapper<Customer> {
    List<Customer> AllCustomers();

    List<Map<String, Object>> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);

    int updateDel(Integer paramInteger);

    int find(Integer paramInteger);

    int save(Customer paramCustomer);

    int updateC(Customer paramCustomer);

    List<CustomerSys> customerSyslist();

    int updateCS(CustomerSys paramCustomerSys);

    int saveCS(CustomerSys paramCustomerSys);
}