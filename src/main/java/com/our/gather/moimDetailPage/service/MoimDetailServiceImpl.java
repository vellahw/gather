package com.our.gather.moimDetailPage.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.our.gather.common.common.CommandMap;
import com.our.gather.moimDetailPage.dao.MoimDetailDao;

@Service("MoimDetailService")
public class MoimDetailServiceImpl implements MoimDetailService {

	@Resource(name = "MoimDetailDao")
	private MoimDetailDao moimDetailDao;

	// 게더 상세보기
	@Override
	public Map<String, Object> getMoimDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return moimDetailDao.getMoimDetail(map, commandMap, session);
	}

	// 게더 이미지
	@Override
	public List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return moimDetailDao.getMoimImg(map, commandMap);
	}

	// 게더 맴버 리스트
	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public List<Map<String, Object>> getMoimMember(Map<String, Object> map, CommandMap commandMap,
													 HttpSession session) throws Exception {
		// TODO Auto-generated method stub

		return moimDetailDao.getMoimMember(map, commandMap, session);
	}

	// 로그인 한 회원의 게더 참여 상황.
	@Override
	public Map<String, Object> getMoimYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return moimDetailDao.getMoimYourState(map, commandMap, session);
	}

	// 모임참여
	@Override
	public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
		moimDetailDao.moimJoin(map, commandMap);
	}

	// 모임 참여 상태변경
	@Override
	public void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		moimDetailDao.moimStateUpdate(map, commandMap);
	}

	// 게더 마감
	@Override
	public void setMoimEnd(Map<String, Object> map) throws Exception {
		moimDetailDao.setMoimEnd(map);
	}


}
