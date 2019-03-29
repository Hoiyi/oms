package com.hu.knowledge.knowledgeStore.service;

import com.hu.knowledge.knowledgeStore.domain.Knowledge;
import com.hu.sysManagement.common.utils.Query;
import java.util.List;
import java.util.Map;

public interface KnowledgeService {
	
	List<Map<String, Object>> list(Query paramQuery);

	int count(Map<String, Object> paramMap);

	Knowledge selectById(Long paramLong);

	int save(Knowledge paramKnowledge);

	int update(Knowledge paramKnowledge);

	int deleteById(Long paramLong);
}