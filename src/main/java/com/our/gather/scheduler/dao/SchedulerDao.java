package com.our.gather.scheduler.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("SchedulerDao")
public class SchedulerDao extends AbstractDao {


	// 게더 맴버 추출
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGatherMemberForSD(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> getGatherMemberForSD = (List<Map<String, Object>>) selectList(
				"scheduler.getGatherMemberForScheduler", map);

		return getGatherMemberForSD;
	}

	// 만남시간이 지난 게더리스트
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getEndedGahter() throws Exception {

		List<Map<String, Object>> getEndedGahter = (List<Map<String, Object>>) selectList("scheduler.getEnddedGahter");

		return getEndedGahter;
	}

	// 하루남은 게더리스트
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getOneDayLeft() throws Exception {

		List<Map<String, Object>> getEndedGahter = (List<Map<String, Object>>) selectList("scheduler.getOneDayLeftGather");

		return getEndedGahter;
	}

}
