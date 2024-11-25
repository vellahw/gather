package com.our.gather.moimDetailPage.service;

import java.util.List;
import java.util.Map;

import com.our.gather.common.common.CommandMap;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;

public interface MoimDetailService {


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

	// 모임 참여
	void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 모임 참여 상태 변경
	void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 게더마감
	void setMoimEnd(Map<String, Object> map) throws Exception;

}
