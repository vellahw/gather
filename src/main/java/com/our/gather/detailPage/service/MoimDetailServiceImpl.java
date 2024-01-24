package com.our.gather.detailPage.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.our.gather.common.common.CommandMap;
import com.our.gather.detailPage.dao.MoimDetailDao;

@Service("MoimDetailService")
public class MoimDetailServiceImpl implements MoimDetailService {

	@Resource(name = "MoimDetailDao")
	private MoimDetailDao moimDetailDao;

	// 모임참여
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
		moimDetailDao.moimJoin(map, commandMap);
	}

	// 모임 참여 상태변경
	@Override
	public void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		moimDetailDao.moimStateUpdate(map, commandMap);
	}

}
