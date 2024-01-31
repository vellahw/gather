package com.our.gather.join.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("JoinDao")
public class JoinDao extends AbstractDao {

	// 회원가입
	public void joinUs(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("join.joinUs", map);
	}

	// 회원 선호카테고리 저장
	public void inertCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("join.inertCate", map);
	}

	// 회원 선호카테고리 중복확인
	public int checkCategoryIsin(Map<String, Object> map) throws Exception {
		return Integer.parseInt(selectOne("join.checkCategoryIsin", map).toString());
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
