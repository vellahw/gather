package com.our.gather.notify.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.notify.dao.NotifyDao;

@Service("NotifyService")
public class NotifyServiceImpl implements NotifyService {
	@Resource(name = "NotifyDao")
	private NotifyDao notifyDao;

	//알림 insert
	@Override
	public void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception {
		notifyDao.insertNotify(map, commondMap);
	}

	//읽지 않은 알림 조회
	@Override
	public List<Map<String, Object>> getNotify(Map<String, Object> map, CommandMap commondMap, HttpSession session)
			throws Exception {

		commondMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		return notifyDao.getNotify(map, commondMap);
	}

	//알림 읽음처리
	@Override
	public void updateReadNoti(Map<String, Object> map, CommandMap commondMap) throws Exception {
		notifyDao.updateReadNoti(map, commondMap);
	}
}
