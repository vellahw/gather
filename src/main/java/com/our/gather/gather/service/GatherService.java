package com.our.gather.gather.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface GatherService {

	List<Map<String, Object>> getGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	Map<String, Object> getGatherDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	List<Map<String, Object>> getGatherMember(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	Map<String, Object> getGatherYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	List<Map<String, Object>> getEndedGahter(String currentDateString)
			throws Exception;
	
    void setGatherEnd(Map<String, Object> map) throws Exception;
}
