package com.our.gather.common.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;

@Service("CommonService")
public class CommonServiceImpl implements CommonService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	// 부모카테고리
	@Override
	public List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.pCate(map, commandMap);
	}

	// 자식카테고리
	@Override
	public List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.cCate(map, commandMap);
	}

	// 지역전체
	@Override
	public List<Map<String, Object>> getRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getRegi(map, commandMap);
	}

	// 카테고리전체
	@Override
	public List<Map<String, Object>> getCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getCate(map, commandMap);
	}

	// 좋아요 insert
	@Override
	public void likeInsert(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.likeInsert(map, commandMap);
	}

	// 좋아요 Delete
	@Override
	public void likeDelete(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.likeDelete(map, commandMap);
	}

	// 팔로우
	@Override
	public void follow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.follow(map, commandMap);
	}

	// 언팔로우
	@Override
	public void unfollow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.unfollow(map, commandMap);
	}

}
