package com.our.gather.main.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.main.dao.MainDao;

@Service("MainService")
public class MainServiceImpl implements MainService {
	
	
	@Resource(name = "MainDao")
	private MainDao mainDao;

	@Override
	public List<Map<String, Object>> mainGather(Map<String, Object> map, HttpSession session,
			CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			commandMap.put("USER_IMAG", session.getAttribute("USER_IMAG"));
			commandMap.put("USER_NICK", session.getAttribute("USER_NICK"));
		}
		
		return mainDao.mainGather(map, commandMap, session);
	}

}