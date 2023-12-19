package com.our.gather.join.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

@Repository("joinDao")
public class joinDao extends AbstractDao {

	// 로그인 유효성 검사
	@SuppressWarnings("unchecked")
	public Map<String, Object> getUserPK(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne("join.getUserPK", map);
	}
	
	// 회원가입
	public void joinUs(Map<String, Object> map) throws Exception {
		insert("join.joinUs", map);
	}

}
