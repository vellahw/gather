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

	// 파일 insert
	public void mapInsert(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("common.mapInsert", map);
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
	public List<Map<String, Object>> getCate(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getCate = (List<Map<String, Object>>) selectList("common.getCate", map);

		return getCate;
	}

	// 지역 전체
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getRegi = (List<Map<String, Object>>) selectList("common.getRegi", map);

		return getRegi;
	}

	// 지역 검색(모임 작성시 카카오맵에 있는 주소정보 검색용)
	@SuppressWarnings("unchecked")
	public Map<String, Object> searchRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {

		Map<String, Object> searchRegi = (Map<String, Object>) selectOne("common.searchRegi", map);

		return searchRegi;
	}
}
