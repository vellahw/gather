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

	// 부모카테고리
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> pCate(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> pCate = (List<Map<String, Object>>) selectList("common.pCate", map);

		return pCate;
	}

	// 자식카테고리
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> cCate(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> cCate = (List<Map<String, Object>>) selectList("common.cCate", map);

		return cCate;
	}

	// 카테고리 전체
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getCategory(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getCategory = (List<Map<String, Object>>) selectList("common.getCategory", map);

		return getCategory;
	}

	// 좋아요insert
	public void likeInsert(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("common.likeInsert", map);
	}

	// 좋아요 Delete
	public void likeDelete(Map<String, Object> map, CommandMap commandMap) throws Exception {
		delete("common.likeDelete", map);
	}

	// 팔로우
	public void follow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("common.follow", map);
	}

	// 언팔로우
	public void unfollow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		delete("common.unfollow", map);
	}

}
