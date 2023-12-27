package com.our.gather.main.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.main.dao.mainDao;



@Service("mainService")
public class mainServiceImpl implements mainService {
	@Resource(name = "mainDao")
	private mainDao mainDao;

	@Override
	public List<Map<String, Object>> menuList(Map<String, Object> map, CommandMap commandMap) throws Exception {

		return mainDao.menuList(map, commandMap);
	}
	
	@Override
	public List<Map<String, Object>> getGather(Map<String, Object> map, HttpSession session, CommandMap commandMap) throws Exception {

		return mainDao.getGather(map, commandMap, session);
	}
}