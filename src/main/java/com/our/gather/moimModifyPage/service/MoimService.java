package com.our.gather.moimModifyPage.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface MoimService {
	
	// 게더 리스트
	List<Map<String, Object>> getMoimList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 상세보기
	Map<String, Object> getMoimDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 이미지
	List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 게더 멤버
	List<Map<String, Object>> getMoimMember(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception;

	// 로그인 회원 현재 게더 참여상태
	Map<String, Object> getMoimYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 갯수 return
	int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	// 회원가입
	void makeMoim(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request, HttpSession session)
			throws Exception;

	// 게더마감
	void setMoimEnd(Map<String, Object> map) throws Exception;

}
