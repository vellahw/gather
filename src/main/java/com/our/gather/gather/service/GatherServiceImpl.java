package com.our.gather.gather.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.our.gather.common.common.CommandMap;
import com.our.gather.gather.dao.GatherDao;

@Service("GatherService")
public class GatherServiceImpl implements GatherService {
	@Resource(name = "GatherDao")
	private GatherDao gatherDao;

	@Override
	public List<Map<String, Object>> getGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			commandMap.put("USER_IMAG", session.getAttribute("USER_IMAG"));
			commandMap.put("USER_NICK", session.getAttribute("USER_NICK"));
		} else {

			commandMap.put("USER_NUMB", "null");
		}

		return gatherDao.getGather(map, commandMap, session);
	}

	//일정이 지난 게더
	@Override
	public List<Map<String, Object>> getEndedGahter(String currentDateString) throws Exception {
		// TODO Auto-generated method stub

		return gatherDao.getEndedGahter(currentDateString);
	}	

	//게더 마감
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void setGatherEnd(Map<String, Object> map) throws Exception {
		gatherDao.setGatherEnd(map);
	}
}
