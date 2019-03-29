package com.hu.knowledge.knowledgeStore.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hu.knowledge.knowledgeStore.domain.Knowledge;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KnowledgeDao extends BaseMapper<Knowledge> {
    List<Map<String, Object>> list(Map<String, Object> paramMap);

    int count(Map<String, Object> paramMap);
}