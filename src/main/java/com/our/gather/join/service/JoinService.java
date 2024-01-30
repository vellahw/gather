package com.our.gather.join.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.our.gather.common.common.CommandMap;

public interface JoinService {

	// 회원가입
	void userJoin(Map<String, Object> map , CommandMap commandMap , HttpServletRequest request) throws Exception;

	// 아이디 중복 확인
	Map<String, Object> checkId(Map<String, Object> map) throws Exception;

	// 닉네임 중복 확인
	Map<String, Object> checkNick(Map<String, Object> map) throws Exception;

}
