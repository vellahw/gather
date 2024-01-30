package com.our.gather.scheduler.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.scheduler.dao.SchedulerDao;

@Service("SchedulerService")
public class SchedulerServiceImpl implements SchedulerService {
	@Resource(name = "SchedulerDao")
	private SchedulerDao schedulerDao;

	// 게더 맴버 리스트
	@Override
	public List<Map<String, Object>> getGatherMemberForSD(Map<String, Object> map, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		return schedulerDao.getGatherMemberForSD(map, commandMap);
	}

	// 일정이 지난 게더
	@Override
	public List<Map<String, Object>> getEndedGahter() throws Exception {
		// TODO Auto-generated method stub

		return schedulerDao.getEndedGahter();
	}

	// 만남시간 하루 남은  게더
	@Override
	public List<Map<String, Object>> getOneDayLeft() throws Exception {
		// TODO Auto-generated method stub
		
		return schedulerDao.getOneDayLeft();
	}
}
