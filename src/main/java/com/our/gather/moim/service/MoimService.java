package com.our.gather.moim.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface MoimService {

	// 메인 게더
	List<Map<String, Object>> mainGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 리스트
	List<Map<String, Object>> getGatherList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 상세보기
	Map<String, Object> getGatherDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 이미지
	List<Map<String, Object>> getGatherImg(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 게더 멤버
	List<Map<String, Object>> getGatherMember(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception;

	// 로그인 회원 현재 게더 참여상태
	Map<String, Object> getGatherYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 갯수 return
	int getGatherCount(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	// 게더번호 채번
	String makeGatherNumb()
			throws Exception;

	// 회원가입
	void makeGather(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request, HttpSession session)
			throws Exception;

	// 게더마감
	void setGatherEnd(Map<String, Object> map) throws Exception;

}
