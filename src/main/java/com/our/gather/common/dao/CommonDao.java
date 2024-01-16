package com.our.gather.common.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;

@Repository("CommonDao")
public class CommonDao extends AbstractDao {

	
	// 파일 insert
	public void comFileInsert(Map<String, Object> map) throws Exception {
		insert("common.fileInsert", map);
	}
	
	//
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
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getCategory(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> getCategory = (List<Map<String, Object>>) selectList("common.getCategory", map);

		return getCategory;
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap)
			throws Exception {

		List<Map<String, Object>> getMoimImg = (List<Map<String, Object>>) selectList("common.getMoimImg", map);

		return getMoimImg;
	}


}
