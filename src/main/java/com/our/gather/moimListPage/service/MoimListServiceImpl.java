package com.our.gather.moimListPage.service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.moimListPage.dao.MoimListDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Service("MoimListService")
public class MoimListServiceImpl implements MoimListService {

   @Resource(name = "MoimListDao")
   private MoimListDao moimListDao;

   @Resource(name = "fileUtils")
   private FileUtils fileUtils;
   
	// 모임 리스트
	@Override
	public List<Map<String, Object>> getMoimList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		} else {

			commandMap.put("USER_NUMB", null);

		}

		return moimListDao.getMoimList(map, commandMap, session);
	}



	// 게더 갯수 return
	public int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception {

		return moimListDao.getMoimCount(map, commandMap);
	}
   
}