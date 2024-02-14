package com.our.gather.moimGather.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Pager;

public interface GatherService {

	// 메인 게더
	List<Map<String, Object>> mainGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;

	// 게더 리스트
	List<Map<String, Object>> getGatherList(Map<String, Object> map, HttpSession session, CommandMap commandMap, Pager pager)
			throws Exception;
	
	//게더 상세보기
	Map<String, Object> getGatherDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	//게더 이미지
	List<Map<String, Object>> getGatherImg(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	
	//게더 멤버
	List<Map<String, Object>> getGatherMember(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception;
	
	
	//로그인 회원 현재 게더 참여상태
	Map<String, Object> getGatherYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception;
	
	
	//게더마감
	void setGatherEnd(Map<String, Object> map) throws Exception;
	
}
