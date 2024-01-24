package com.our.gather.notify.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.notify.dao.NotifyDao;

@Service("NotifyService")
public class NotifyServiceImpl implements NotifyService {
	@Resource(name = "NotifyDao")
	private NotifyDao notifyDao;


	// 게더 마감
	@Override
	public void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception {
		notifyDao.insertNotify(map, commondMap);
	}
}
