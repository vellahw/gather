package com.our.gather.notify.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface NotifyService {

	// 알림 insert
	void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception;

	//읽지 않은 알림 조회
	List<Map<String, Object>> getNotify(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception;
	
	// 알림 읽음처리
	void updateReadNoti(Map<String, Object> map, CommandMap commondMap) throws Exception;

}
