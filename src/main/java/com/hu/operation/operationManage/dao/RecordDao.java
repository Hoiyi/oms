package com.hu.operation.operationManage.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.knowledge.knowledgeStore.domain.Knowledge;
import com.hu.operation.operationManage.domain.Customer;
import com.hu.operation.operationManage.domain.Record;
import com.hu.sysManagement.common.utils.Query;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecordDao extends BaseMapper<Record> {
    List<Map<String, Object>> list(Query paramQuery);

    int count(Query paramQuery);

    List<Customer> queryCusName(String paramString);

    List<Knowledge> queryDescribe(String paramString);

    List<Map<String, Object>> gaslist(Query paramQuery);
}