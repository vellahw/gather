package com.our.gather.userLoginPage.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

@Repository("loginDao")
public class LoginDao extends AbstractDao {

	// 로그인화면 배경 이미지
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> loginBackImg(Map<String, Object> map) throws Exception {

		return (List<Map<String, Object>>) selectList("login.loginBackImg", map);
	}

	// 로그인시 아이디 확인
	public int loginCheck(Map<String, Object> map) throws Exception {
		return Integer.parseInt(selectOne("login.loginCheck", map).toString());
	}

	// 로그인
	@SuppressWarnings("unchecked")
	public Map<String, Object> login(Map<String, Object> map) throws Exception {

		return (Map<String, Object>) selectOne("login.login", map);
	}

	// 아이디찾기
	@SuppressWarnings("unchecked")
	public Map<String, Object> findId(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("login.findId", map);
	}

	// 비밀번호찾기
	@SuppressWarnings("unchecked")
	public Map<String, Object> findPw(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("login.findPw", map);
	}

}