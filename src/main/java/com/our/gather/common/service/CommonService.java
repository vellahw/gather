package com.our.gather.common.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface CommonService {

	void mapInsert(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	void likeInsert(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	void likeDelete(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	void follow(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	void unfollow(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	void tagInsert(Map<String, Object> map) throws Exception;
	
	List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	List<Map<String, Object>> getCate(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	List<Map<String, Object>> getRegi(Map<String, Object> map, CommandMap commandMap) throws Exception;

	String getCodeOption(String COMM_CODE, String COMD_CODE, String OPTN_NUMB) throws Exception;
	
	String extractRegiCode(String adr) throws Exception;
	
	Object makeFollowBtn(Object data, HttpSession session) throws Exception;
	

}
