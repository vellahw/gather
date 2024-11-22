package com.our.gather.userMyPage.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.userMyPage.dao.UserPageDao;

@Service("UserPageService")
public class UserPageServiceImpl implements UserPageService {

	@Resource(name = "UserPageDao")
	private UserPageDao userPageDao;

	// 유저 마이페이지
	@Override
	public Map<String, Object> userPage(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		return userPageDao.userPage(map, commandMap, session);
	}

	// 유저 선호지역
	@Override
	public List<Map<String, Object>> userRegi(Map<String, Object> map, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		return userPageDao.userRegi(map, commandMap);
	}
}
