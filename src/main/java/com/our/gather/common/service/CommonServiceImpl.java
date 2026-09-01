package com.our.gather.common.service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Service("CommonService")
public class CommonServiceImpl implements CommonService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	//kakaoMap insert
	@Override
	public void mapInsert(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.mapInsert(map, commandMap);
	}

	// 좋아요 insert
	@Override
	public void likeInsert(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.likeInsert(map, commandMap);
	}

	// 좋아요 Delete
	@Override
	public void likeDelete(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.likeDelete(map, commandMap);
	}

	// 팔로우
	@Override
	public void follow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.follow(map, commandMap);
	}

	// 언팔로우
	@Override
	public void unfollow(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		commonDao.unfollow(map, commandMap);
	}

	// 코드 옵션 호출
	@Override
	public String getCodeOption(String COMM_CODE, String COMD_CODE, String OPTN_NUMB) throws Exception {
		return commonDao.getCodeOption(COMM_CODE, COMD_CODE, OPTN_NUMB);
	}

	// 부모카테고리
	@Override
	public List<Map<String, Object>> getParentsCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getParentsCate(map, commandMap);
	}

	// 자식카테고리
	@Override
	public List<Map<String, Object>> getChildCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getChildCate(map, commandMap);
	}

	// 카테고리전체
	@Override
	public List<Map<String, Object>> getAllCate(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getAllCate(map, commandMap);
	}

	// 지역전체
	@Override
	public List<Map<String, Object>> getRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return commonDao.getRegi(map, commandMap);
	}

	// 지역 한글정보 코드로 치환
	@Override
	public String extractRegiCode(String adr) throws Exception {
		// TODO Auto-generated method stub

		String[] moimRegi = adr.split(" ");

		String pRegi = moimRegi[0].substring(0, 2);
		String cRegi = moimRegi[1].substring(0, 2);

		Map<String, Object> regiMap = new HashMap<>();

		switch (pRegi) {

		case "서울":

			regiMap.put("COMD_CODE", "A");
			break;

		case "경기":

			regiMap.put("COMD_CODE", "B");
			break;

		case "인천":

			regiMap.put("COMD_CODE", "C");
			break;

		case "강원":

			regiMap.put("COMD_CODE", "D");
			break;

		case "충북":

			regiMap.put("COMD_CODE", "E");
			break;

		case "충남":

			regiMap.put("COMD_CODE", "F");
			break;

		case "세종":

			regiMap.put("COMD_CODE", "G");
			break;

		case "대전":

			regiMap.put("COMD_CODE", "H");
			break;

		case "광주":

			regiMap.put("COMD_CODE", "I");
			break;

		case "전북":

			regiMap.put("COMD_CODE", "J");
			break;

		case "경북":

			regiMap.put("COMD_CODE", "K");
			break;

		case "대구":

			regiMap.put("COMD_CODE", "L");
			break;

		case "제주":

			regiMap.put("COMD_CODE", "M");
			break;

		case "전남":

			regiMap.put("COMD_CODE", "N");
			break;

		case "울산":

			regiMap.put("COMD_CODE", "O");
			break;

		case "경남":

			regiMap.put("COMD_CODE", "P");
			break;

		case "부산":

			regiMap.put("COMD_CODE", "Q");
			break;

		}

		regiMap.put("COMD_NAME", cRegi);

		Map<String, Object> map = commonDao.searchRegi(regiMap);
		String adrCode = (String)map.get("COMD_CODE");

		return adrCode;


	}
	
	// 해시태그 insert
	public void tagInsert(Map<String, Object> map) throws Exception {

		List<String> hashtags = new ArrayList<>();

		String text = (String) map.get("MOIM_CNTT");

		// 해시태그를 추출할 정규 표현식 패턴
		Pattern pattern = Pattern.compile("#[\\p{IsHangul}\\p{IsAlphabetic}\\p{IsDigit}]+");

		Matcher matcher = pattern.matcher(text);
		while (matcher.find()) {
			// 매칭된 해시태그를 리스트에 추가
			hashtags.add(matcher.group().substring(1)); // # 기호 제거 후 추가;
		}

		for (int i = 0; i < hashtags.size(); i++) {

			Map<String, Object> tagMap = new HashMap<>();
			tagMap.put("MOIM_IDXX", map.get("MOIM_IDXX"));
			tagMap.put("HASH_TAGG", hashtags.get(i));

			commonDao.tagInsert(tagMap);

		}

	}
	
	// moim객체에 follow버튼 추가
	@Override
	public void makeFollowBtn(Map<String, Object> data, HttpSession session) throws Exception {
		if (data == null) {
			return;
		}
		makeFollowBtn(java.util.Collections.singletonList(data), session);
	}

	@Override
	public void makeFollowBtn(List<Map<String, Object>> items, HttpSession session) throws Exception {
		if (items.isEmpty()) {
			return;
		}
		List<Object> userIds = new ArrayList<>();
		for (Map<String, Object> item : items) {
			userIds.add(item.get("USER_NUMB"));
		}
		String me = String.valueOf(session.getAttribute("USER_NUMB"));
		List<Map<String, Object>> states = commonDao.getFollowStates(me, userIds);
		Map<String, Map<String, Object>> stateByUser = new HashMap<>();
		for (Map<String, Object> state : states) {
			stateByUser.put(String.valueOf(state.get("FOLW_USER")), state);
		}
		for (Map<String, Object> item : items) {
			Map<String, Object> state = stateByUser.get(String.valueOf(item.get("USER_NUMB")));
			if (state != null) {
				item.put("FOLW_CODE", state.get("FOLW_CODE"));
				item.put("FOLW_BTNN", state.get("FOLW_BTNN"));
			}
		}
	}

	@Override
	public String getCodeName(String commonCode, String detailCode) throws Exception {
		return commonDao.getCodeName(commonCode, detailCode);
	}

}
