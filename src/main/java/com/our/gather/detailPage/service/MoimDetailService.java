package com.our.gather.detailPage.service;

import java.util.Map;

import com.our.gather.common.common.CommandMap;

public interface MoimDetailService {

	// 모임 참여
	void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception;

	// 모임 참여 상태 변경
	void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception;
}
