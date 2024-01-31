package com.our.gather.join.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.join.dao.JoinDao;

@Service("JoinService")
public class JoinServiceImpl implements JoinService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	@Resource(name = "JoinDao")
	private JoinDao joinDao;

	@Resource(name = "fileUtils")
	private FileUtils fileUtils;

	// 회원가입
	@Override
	public void userJoin(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request) throws Exception {

		joinDao.joinUs(map, commandMap);

		try {

			List<Map<String, Object>> plist = fileUtils.fileInsert(map, request);

			for (int i = 0, size = plist.size(); i < size; i++) {

				commonDao.comFileInsert(map);

			}

		} catch (Exception e) {

		}

	}

	// 선호 카테고리 저장
	@Override
	public void inertCate(Map<String, Object> map, CommandMap commandMap) throws Exception {

		Map<String, Object> hsMap = new HashMap<>();

		hsMap.put("CATE_IDXX", map.get("CATE_IDXX"));
		hsMap.put("USER_NUMB", map.get("USER_NUMB"));
		
		int result = joinDao.checkCategoryIsin(hsMap);
		
		if(result == 0) {
			
			joinDao.inertCate(map, commandMap);
		}

	}

	// 아이디 중복 검사
	@Override
	public Map<String, Object> checkId(Map<String, Object> map) throws Exception {
		return joinDao.checkId(map);
	}

	// 닉네임 중복 검사
	@Override
	public Map<String, Object> checkNick(Map<String, Object> map) throws Exception {
		return joinDao.checkNick(map);
	}

}
