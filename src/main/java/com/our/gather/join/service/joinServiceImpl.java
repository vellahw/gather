package com.our.gather.join.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.our.gather.common.dao.commonDao;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.join.dao.joinDao;

@Service("joinService")
public class joinServiceImpl implements joinService {
	
	@Resource(name = "commonDao")
	private commonDao commonDao;
	
	@Resource(name = "joinDao")
	private joinDao joinDao;

	@Resource(name = "fileUtils")
	private FileUtils fileUtils;

	@Override
	public Map<String, Object> getUserPK(Map<String, Object> map) throws Exception {
		return joinDao.getUserPK(map);
	}

	// 회원가입
	@Override
	public void userJoin(Map<String, Object> map ,  HttpServletRequest request) throws Exception {

		Map<String, Object> pk = joinDao.getUserPK(map);

		String userNumb = (String) pk.get("USER_NUMB");
		map.put("USER_NUMB", userNumb);
		
		List<Map<String, Object>> plist = fileUtils.fileInsert(map, request);
		
		for (int i = 0, size = plist.size(); i < size; i++) {
			commonDao.comFileInsert(map);
		}
	    
		
		joinDao.joinUs(map);
	}
}
