package com.our.gather.notify.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("NotifyDao")
public class NotifyDao extends AbstractDao {

	// 모임마감
	public void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception {
		insert("notify.insertNotify", map);
	}
}
