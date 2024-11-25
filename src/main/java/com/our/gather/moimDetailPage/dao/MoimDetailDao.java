package com.our.gather.moimDetailPage.dao;

import java.util.List;
import java.util.Map;

import com.our.gather.common.service.CommonService;
import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Repository("MoimDetailDao")
public class MoimDetailDao extends AbstractDao {

	@Resource(name = "CommonService")
	private CommonService commonService;

	// 게더 상세보기
	@SuppressWarnings("unchecked")
	public Map<String, Object> getMoimDetail(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> getMoimDetail = (Map<String, Object>) selectOne("moim.getMoim", map);

		if (session.getAttribute("USER_NUMB") != null) {

			commonService.makeFollowBtn(getMoimDetail, session);

		}

		return getMoimDetail;
	}

	// 모임 멤버
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMoimMember(Map<String, Object> map, CommandMap commandMap,
													 HttpSession session) throws Exception {

		List<Map<String, Object>> getMoimMember = (List<Map<String, Object>>) selectList("moim.getMoimMember",
				map);

		for (int i = 0; i < getMoimMember.size(); i++) {

			if (session.getAttribute("USER_NUMB") != null) {

				commonService.makeFollowBtn(getMoimMember, session);

			}

		}

		return getMoimMember;
	}

	// 게더 이미지 불러오기
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getMoimImg = (List<Map<String, Object>>) selectList("moim.getMoimImg", map);

		return getMoimImg;
	}

	// 로그인 맴버 현재 상태
	@SuppressWarnings("unchecked")
	public Map<String, Object> getMoimYourState(Map<String, Object> map, CommandMap commandMap, HttpSession session)
			throws Exception {

		Map<String, Object> getMoimYourState = (Map<String, Object>) selectOne("moim.getMoimMember", map);

		return getMoimYourState;
	}

	// 모임참여
	public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
		insert("moim.moimJoin", map);
	}

	// 모임 참여상태 변경
	public void moimStateUpdate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		update("moim.moimStateUpdate", map);
	}

	// 모임마감
	public void setMoimEnd(Map<String, Object> map) throws Exception {
		update("moim.setMoimEnd", map);
	}

}
