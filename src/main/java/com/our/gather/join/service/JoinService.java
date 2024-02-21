package com.our.gather.join.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface JoinService {

	// 회원가입
	void userJoin(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request, HttpSession session) throws Exception;

	// 선호카테고리 저장
	void inertCate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 선호 지역저장
	void insertRegi(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	String makeUserNumb() throws Exception;

	// 아이디 중복 확인
	Map<String, Object> checkId(Map<String, Object> map) throws Exception;

	// 닉네임 중복 확인
	Map<String, Object> checkNick(Map<String, Object> map) throws Exception;


}
