package com.our.gather.main.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("MainDao")
public class MainDao extends AbstractDao {
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> pCate = (List<Map<String, Object>>) selectList("common.pCate", map);

		return pCate;
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> cCate = (List<Map<String, Object>>) selectList("common.cCate", map);

		return cCate;
	}

	// 로그인시 메인
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> loginMainGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		List<Map<String, Object>> loginMainGather = (List<Map<String, Object>>) selectList("mainPage.mainLoginGather", map);

		return loginMainGather;
	}
	
	// 로그인시 메인
		@SuppressWarnings("unchecked")
		public List<Map<String, Object>> getGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
				throws Exception {

			List<Map<String, Object>> getGather = (List<Map<String, Object>>) selectList("mainPage.getGather", map);

			return getGather;
		}
}