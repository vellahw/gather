package com.our.gather.notify.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("NotifyDao")
public class NotifyDao extends AbstractDao {

	// 알림 insert
	public void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception {
		insert("notify.insertNotify", map);
	}

	// 알림
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getNotify(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getNotify = (List<Map<String, Object>>) selectList("notify.getNotify", map);

		return getNotify;
	}

	// 알림 읽음처리
	public void updateReadNoti(Map<String, Object> map, CommandMap commondMap) throws Exception {
		update("notify.updateReadNoti", map);
	}
}
