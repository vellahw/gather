package com.our.gather.common.service;

import java.util.List;
import java.util.Map;

import com.our.gather.common.common.CommandMap;

public interface CommonService {

	List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception;
}
