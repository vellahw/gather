package com.our.gather.main.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface MainService {

	List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	List<Map<String, Object>> loginMainGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	List<Map<String, Object>> getGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
}