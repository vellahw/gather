package com.our.gather.common.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

@Repository("commonDao")
public class commonDao extends AbstractDao {

	
	// 회원가입
	public void comFileInsert(Map<String, Object> map) throws Exception {
		insert("common.fileInsert", map);
	}

}
