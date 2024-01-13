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

	@Override
	public List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.pCate(map, commandMap);
	}
	
	@Override
	public List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.cCate(map, commandMap);
	}
	
	@Override
	public List<Map<String, Object>> getCategory(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getCategory(map, commandMap);
	}


}
