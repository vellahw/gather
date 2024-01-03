package com.our.gather.main.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.main.dao.MainDao;

import lombok.extern.slf4j.Slf4j;

@Service("MainService")
public class MainServiceImpl implements MainService {
	@Resource(name = "MainDao")
	private MainDao mainDao;

	@Override
	public List<Map<String, Object>> loginMainGather(Map<String, Object> map, HttpSession session,
			CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		}
		
		return mainDao.loginMainGather(map, commandMap, session);
	}

	@Override
	public List<Map<String, Object>> getGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub
		
		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		}

		return mainDao.getGather(map, commandMap, session);
	}
}