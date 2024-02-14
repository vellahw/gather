package com.our.gather.moimGather.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Pager;
import com.our.gather.moimGather.dao.GatherDao;

@Service("GatherService")
public class GatherServiceImpl implements GatherService {
	@Resource(name = "GatherDao")
	private GatherDao gatherDao;

	//게더 메인리스트
	@Override
	public List<Map<String, Object>> mainGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return gatherDao.mainGather(map, commandMap, session);
	}
	
	//게더리스트
	@Override
	public List<Map<String, Object>> getGatherList(Map<String, Object> map, HttpSession session, CommandMap commandMap, Pager pager)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		}
		
		Long totalCount =  gatherDao.getGatherCount(map, commandMap);
		
		pager.setRow();
		pager.setNum(totalCount);

		return gatherDao.getGatherList(map, commandMap, session, pager);
	}
	
	
	//게더 상세보기
	@Override
	public Map<String, Object> getGatherDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub
		
		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			
		}
		
		return gatherDao.getGatherDetail(map, commandMap, session);
	}
	
	//게더 이미지
	@Override
	public List<Map<String, Object>> getGatherImg(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return gatherDao.getGatherImg(map, commandMap);
	}
	
	//게더 맴버 리스트
	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public List<Map<String, Object>> getGatherMember(Map<String, Object> map, CommandMap commandMap, HttpSession session) throws Exception {
		// TODO Auto-generated method stub
		
		return gatherDao.getGatherMember(map, commandMap, session);
	}
	
	
	//로그인 한 회원의 게더 참여 상황.
	@Override
	public Map<String, Object> getGatherYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub
		
		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return gatherDao.getGatherYourState(map, commandMap, session);
	}
	
	// 게더 마감
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void setGatherEnd(Map<String, Object> map) throws Exception {
		gatherDao.setGatherEnd(map);
	}
}
