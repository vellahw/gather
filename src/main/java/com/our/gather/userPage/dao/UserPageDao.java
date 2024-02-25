package com.our.gather.userPage.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;
import com.our.gather.common.service.CommonService;

@Repository("UserPageDao")
public class UserPageDao extends AbstractDao {
	
	@Resource(name = "CommonService")
	private CommonService commonService;

	// 유저 페이지
	@SuppressWarnings("unchecked")
	public Map<String, Object> userPage(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> userPage = (Map<String, Object>) selectOne("userPage.userInfo", map);

		if (session.getAttribute("USER_NUMB") != null) {

			commonService.makeFollowBtn(userPage, session);

		}

		return userPage;
	}
	
	// 유저 선호지역
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> userRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> userRegi = (List<Map<String, Object>>) selectList("userPage.userRegi", map);


		return userRegi;
	}

}
