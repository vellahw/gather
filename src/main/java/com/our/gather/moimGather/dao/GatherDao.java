package com.our.gather.moimGather.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

@Repository("GatherDao")
public class GatherDao extends AbstractDao {

	// 로그인시 메인 게더
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> mainGather(Map<String, Object> map, CommandMap commandMap, HttpSession session) throws Exception {
	    
		List<Map<String, Object>> mainGather = (List<Map<String, Object>>) selectList("gather.mainGather", map);
	    
	    for (int i = 0; i < mainGather.size(); i++) {
	        Map<String, Object> hash = new HashMap<>();
	        hash.put("HASH_IDXX", mainGather.get(i).get("MOIM_IDXX"));

	        List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

	        List<Object> hashTag = new ArrayList<>();

	        if (!HashTag.isEmpty()) {

	            for (Map<String, Object> tag : HashTag) {
	            	hashTag.add(tag.get("HASH_TAGG"));
	            }
	        }

	        mainGather.get(i).put("HASH_TAGG", hashTag);
	    }

	    return mainGather;
	}

	// 게더추출
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGatherList(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		List<Map<String, Object>> getGatherList = (List<Map<String, Object>>) selectList("gather.getGather", map);
		
		  for (int i = 0; i < getGatherList.size(); i++) {
		        Map<String, Object> hash = new HashMap<>();
		        hash.put("HASH_IDXX", getGatherList.get(i).get("MOIM_IDXX"));

		        List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

		        List<Object> hashTag = new ArrayList<>();

		        if (!HashTag.isEmpty()) {

		            for (Map<String, Object> tag : HashTag) {
		            	hashTag.add(tag.get("HASH_TAGG"));
		            }
		        }

		        getGatherList.get(i).put("HASH_TAGG", hashTag);
		    }

		return getGatherList;
	}
	
	// 게더 상세보기
	@SuppressWarnings("unchecked")
	public Map<String, Object> getGatherDetail(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> getGatherDetail = (Map<String, Object>) selectOne("gather.getGather", map);

		return getGatherDetail;
	}

	// 게더맴버
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGatherMember(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getGatherMember = (List<Map<String, Object>>) selectList("gather.getGatherMember",
				map);

		return getGatherMember;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGatherImg(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getGatherImg = (List<Map<String, Object>>) selectList("gather.getGatherImg", map);

		return getGatherImg;
	}

	// 로그인 맴버 현재 상태
	@SuppressWarnings("unchecked")
	public Map<String, Object> getGatherYourState(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> getGatherYourState = (Map<String, Object>) selectOne("gather.getGatherMember", map);

		return getGatherYourState;
	}

	// 만남시간이 지난 게더리스트
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getEndedGahter(String currentDateString) throws Exception {

		List<Map<String, Object>> getEndedGahter = (List<Map<String, Object>>) selectList("gather.getEnddedGahter",
				currentDateString);

		return getEndedGahter;
	}

	// 모임마감
	public void setGatherEnd(Map<String, Object> map) throws Exception {
		update("gather.setGatherEnd", map);
	}
}
