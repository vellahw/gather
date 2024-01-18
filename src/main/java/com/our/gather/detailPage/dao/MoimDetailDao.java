package com.our.gather.detailPage.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("MoimDetailDao")
public class MoimDetailDao extends AbstractDao {

	// 모임참여
	public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("detail.moimJoin", map);
	}

	// 모임 참여상태 변경
	public void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("detail.moimStateUpdate", map);
	}

}
