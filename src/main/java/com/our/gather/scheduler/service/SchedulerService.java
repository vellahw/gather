package com.our.gather.scheduler.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;

public interface SchedulerService {
	
	//게더 멤버
	List<Map<String, Object>> getGatherMemberForSD(Map<String, Object> map, CommandMap commandMap) throws Exception;
	
	//로그인 회원 현재 게더 참여상태
	List<Map<String, Object>> getOneDayLeft() throws Exception;
	
	//마감시간이 지난 게더 추출
	List<Map<String, Object>> getEndedGahter() throws Exception;
	
	
}
