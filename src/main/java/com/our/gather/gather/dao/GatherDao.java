package com.our.gather.gather.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("GatherDao")
public class GatherDao extends AbstractDao {

	// 게더추출
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		List<Map<String, Object>> getGather = (List<Map<String, Object>>) selectList("gather.getGather", map);

		return getGather;
	}

	// 만남시간이 지난 게더리스트
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getEndedGahter(String currentDateString) throws Exception {

		List<Map<String, Object>> getEndedGahter = (List<Map<String, Object>>) selectList("gather.getEnddedGahter", currentDateString);

		return getEndedGahter;
	}

	// 모임마감
	public void setGatherEnd(Map<String, Object> map) throws Exception {
		update("gather.setGatherEnd", map);
	}
}
