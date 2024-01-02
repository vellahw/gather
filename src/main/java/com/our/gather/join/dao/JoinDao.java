package com.our.gather.join.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

@Repository("joinDao")
public class JoinDao extends AbstractDao {

	// 회원PK채번
	@SuppressWarnings("unchecked")
	public Map<String, Object> getUserPK(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("join.getUserPK", map);
	}

	// 회원가입
	public void joinUs(Map<String, Object> map) throws Exception {
		insert("join.joinUs", map);
	}

	// 아이디 중복 확인
	@SuppressWarnings("unchecked")
	public Map<String, Object> checkId(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("join.checkId", map);
	}

	// 닉네임 중복 확인
	@SuppressWarnings("unchecked")
	public Map<String, Object> checkNick(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("join.checkNick", map);
	}

}
