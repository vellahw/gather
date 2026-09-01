package com.our.gather.moimMakePage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimMakePage.service.MoimMakeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MoimMakeController {
	@Value("${app.kakao.mapAppKey}")
	private String kakaoMapAppKey;

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "MoimMakeService")
	private MoimMakeService moimMakeService;


	// 개설 폼
	@RequestMapping(value = "/gather/makeMoim.com")
	public ModelAndView moimResister(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/moim/moimMakePage");
		mv.setViewName("moimMakePage");

		List<Map<String, Object>> cate = commonService.getAllCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);

		mv.addObject("cate", cate);
		mv.addObject("regi", regi);
		mv.addObject("kakaoMapAppKey", kakaoMapAppKey);

		return mv;
	}

	// 게더 개설 (Transactional 처리: 트랜잭션 내에서 데이터 변경)
	@Transactional(rollbackFor = Exception.class)
	@RequestMapping(value = "/gather/makeMoimDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> makeGather(@RequestParam("data") String gatherData, @RequestParam("map") String mapData
			, HttpServletRequest request, CommandMap commandMap, HttpSession session) throws Exception {

		try {
			// JSON 데이터를 Map 객체로 변환하기 위한 ObjectMapper 초기화
			ObjectMapper objectMapper = new ObjectMapper();

			// gatherData JSON 문자열을 Map으로 변환 (모임 정보)
			Map<String, Object> resultMoimData = objectMapper.readValue(gatherData,
					new TypeReference<Map<String, Object>>() {});
			if (!isValidMoim(resultMoimData)) {
				return ResponseEntity.badRequest().body("invalid_moim_data");
			}

			// mapData JSON 문자열을 Map으로 변환 (지도 정보)
			Map<String, Object> resultMapData = objectMapper.readValue(mapData,
					new TypeReference<Map<String, Object>>() {});

			// 세션에서 사용자 번호를 가져와 모임 데이터에 추가
			resultMoimData.put("USER_NUMBER", session.getAttribute("USER_NUMBER"));

			// 모임 타입 설정
			commandMap.put("MOIM_TYPE", resultMoimData.get("MOIM_TYPE"));

			// 새로운 모임 ID(MOIM_IDXX) 생성 (DB에서 고유값 생성)
			String moimNumb = moimMakeService.makeMoimNumb(commandMap.getMap(), commandMap);

			// 오프라인 모임인 경우 (모임 주소가 비어 있지 않은 경우)
			if (!String.valueOf(resultMapData.get("MOIM_ADR1")).trim().isEmpty()
					&& !"null".equals(String.valueOf(resultMapData.get("MOIM_ADR1")))) {
				resultMapData.put("MOIM_IDXX", moimNumb); // 생성된 모임 ID를 위치 데이터에 추가

				// 주소를 기반으로 행정 구역 코드 추출
				resultMoimData.put("REGI_CODE", commonService.extractRegiCode((String) resultMapData.get("MOIM_ADR1")));

				// 위치 데이터를 데이터베이스에 삽입
				commonService.mapInsert(resultMapData, commandMap);
			}

			// 모임 데이터에 생성된 모임 ID와 사용자 번호 추가
			resultMoimData.put("MOIM_IDXX", moimNumb);
			resultMoimData.put("USER_NUMB", session.getAttribute("USER_NUMB"));

			// 모임 정보를 데이터베이스에 삽입
			moimMakeService.makeMoim(resultMoimData, commandMap, request, session);

			// 새로운 멤버 테이블 데이터 생성 (모임 참여 정보)
			Map<String, Object> moimJoin = new HashMap<>();
			moimJoin.put("USER_NUMB", session.getAttribute("USER_NUMB")); // 사용자 번호
			moimJoin.put("MOIM_IDXX", moimNumb); // 모임 ID
			moimJoin.put("WAIT_YSNO", "N"); // 대기 상태 여부 (N: 대기 없음)

			// 모임 참여 정보를 데이터베이스에 삽입
			moimMakeService.moimJoin(moimJoin, commandMap);

			// 해시태그 데이터 생성
			Map<String, Object> hashTag = new HashMap<>();
			hashTag.put("MOIM_CNTT", resultMoimData.get("MOIM_CNTT")); // 모임 내용
			hashTag.put("MOIM_IDXX", moimNumb); // 모임 ID

			// 해시태그 데이터를 데이터베이스에 삽입
			commonService.tagInsert(hashTag);

			// 성공적으로 생성된 모임 ID를 반환
			return ResponseEntity.ok(moimNumb);

		} catch (Exception e) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return ResponseEntity.status(400).body("moim_creation_failed");
		}
	}

	private boolean isValidMoim(Map<String, Object> moim) {
		String type = text(moim.get("MOIM_TYPE"));
		String title = text(moim.get("MOIM_TITL"));
		String content = text(moim.get("MOIM_CNTT"));
		String category = text(moim.get("CATE_IDXX"));
		String approval = text(moim.get("APPR_YSNO"));
		String gender = text(moim.get("APPR_GNDR"));
		try {
			int minAge = Integer.parseInt(text(moim.get("MINN_AGEE")));
			int maxAge = Integer.parseInt(text(moim.get("MAXX_AGEE")));
			int minPeople = Integer.parseInt(text(moim.get("MINN_PEOP")));
			int maxPeople = Integer.parseInt(text(moim.get("MAXX_PEOP")));
			int cost = Integer.parseInt(text(moim.get("MOIM_COST")));
			return type.matches("[A-Z]{2}") && !title.isEmpty() && title.length() <= 100
					&& content.length() <= 100000 && category.matches("[0-9A-Za-z_-]{1,20}")
					&& ("Y".equals(approval) || "N".equals(approval))
					&& (gender.isEmpty() || "N".equals(gender) || "M".equals(gender) || "W".equals(gender))
					&& minAge >= 0 && maxAge <= 100 && minAge <= maxAge
					&& minPeople >= 1 && maxPeople <= 100 && minPeople <= maxPeople
					&& cost >= 0 && cost <= 100000000;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	private String text(Object value) {
		return value == null ? "" : String.valueOf(value).trim();
	}

}
