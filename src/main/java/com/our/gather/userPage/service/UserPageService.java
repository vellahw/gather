package com.our.gather.userPage.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface UserPageService {

	// 유저 페이지
	Map<String, Object> userPage(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

}
