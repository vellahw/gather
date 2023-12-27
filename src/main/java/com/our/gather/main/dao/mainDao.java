package com.our.gather.main.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("mainDao")
public class mainDao extends AbstractDao {
	// 메인 카테고리 메뉴바
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> menuList(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> menuList = (List<Map<String, Object>>) selectList("mainPage.menu_List", map);

		return menuList;
	}

	// 메인 카테고리 메뉴바
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGather(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		List<Map<String, Object>> getGather = (List<Map<String, Object>>) selectList("mainPage.getGather", map);

		return getGather;
	}
}