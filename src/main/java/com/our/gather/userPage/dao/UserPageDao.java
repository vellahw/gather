package com.our.gather.userPage.dao;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;
import com.our.gather.common.oracleFunction.OracleFunction;

@Repository("UserPageDao")
public class UserPageDao extends AbstractDao {

	// 유저 페이지
	@SuppressWarnings("unchecked")
	public Map<String, Object> userPage(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> userPage = (Map<String, Object>) selectOne("userPage.userInfo", map);

		if (session.getAttribute("USER_NUMB") != null) {

			String userId = userPage.get("USER_NUMB").toString();

			String me = session.getAttribute("USER_NUMB").toString();

			String folwCode = OracleFunction.getRelationCode(me, userId);

			String folwBtn = OracleFunction.getCodeName("FOLW_CODE", folwCode);

			userPage.put("FOLW_CODE", folwCode);

			userPage.put("FOLW_BTNN", folwBtn);

		}

		return userPage;
	}

}
