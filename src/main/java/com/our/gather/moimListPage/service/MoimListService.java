package com.our.gather.moimListPage.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface MoimListService {
	
	// 게더 리스트
	List<Map<String, Object>> getMoimList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 갯수 return
	int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception;


}
