package com.our.gather.moimMakePage.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public interface MoimMakeService {

	// 모임 개설
	void makeMoim(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request, HttpSession session)
			throws Exception;

	// 모임 번호 채번
	String makeMoimNumb(Map<String, Object> map, CommandMap commandMap)
			throws Exception;

	// 모임 참여
	void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception;
}
