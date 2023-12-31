package com.our.gather.main.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("MainDao")
public class MainDao extends AbstractDao {
	
	// 로그인시 메인
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> mainGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		List<Map<String, Object>> mainGather = (List<Map<String, Object>>) selectList("mainPage.mainGather", map);

		return mainGather;
	}
	
	// 로그인시 메인
		@SuppressWarnings("unchecked")
		public List<Map<String, Object>> getGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
				throws Exception {

			List<Map<String, Object>> getGather = (List<Map<String, Object>>) selectList("mainPage.getGather", map);

			return getGather;
		}
}