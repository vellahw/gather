package com.our.gather.moimModifyPage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimDetailPage.service.MoimDetailService;
import com.our.gather.moimGather.service.GatherService;
import com.our.gather.notify.service.NotifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
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
public class MoimController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "GatherService")
	private GatherService gatherService;

	@Resource(name = "MoimDetailService")
	private MoimDetailService moimDetailService;

	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	// 개설 폼
	@RequestMapping(value = "/gather/makeMoim.com")
	public ModelAndView moimResister(@RequestParam(value="MOIM_IDXX", required = false) String MOIM_IDXX, CommandMap commandMap, HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView("/moimGather/makeGather");
		mv.setViewName("makeGather");

		List<Map<String, Object>> cate = commonService.getCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);

		List<Map<String, Object>> notify = notifyService.getNotify(commandMap.getMap(), commandMap, session);

		mv.addObject("notify", notify);
		mv.addObject("notiCount", notify.size());

		mv.addObject("cate", cate);
		mv.addObject("regi", regi);

		return mv;
	}

	// 게더 개설
	@Transactional(isolation = Isolation.SERIALIZABLE)
	@RequestMapping(value = "/gather/makeMoimDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> makeGather(@RequestParam("data") String gatherData,
			@RequestParam("map") String mapData, HttpServletRequest request, CommandMap commandMap, HttpSession session)
			throws Exception {

		try {

			ObjectMapper objectMapper = new ObjectMapper();

			Map<String, Object> resultGahterData = objectMapper.readValue(gatherData,
					new TypeReference<Map<String, Object>>() {
					});

			Map<String, Object> resultMapData = objectMapper.readValue(mapData,
					new TypeReference<Map<String, Object>>() {
					});

			String gathNumb = gatherService.makeGatherNumb();

			if (!resultMapData.get("MOIM_ADR1").equals("")) {

				resultMapData.get("MOIM_IDXX");
				resultMapData.put("MOIM_IDXX", gathNumb);
				resultGahterData.put("REGI_CODE", commonService.extractRegiCode((String)resultMapData.get("MOIM_ADR1")));
				commonService.mapInsert(resultMapData, commandMap);
			}

			resultGahterData.put("MOIM_IDXX", gathNumb);
			resultGahterData.put("USER_NUMB", session.getAttribute("USER_NUMB"));

			gatherService.makeGather(resultGahterData, commandMap, request, session);

			resultGahterData.put("WAIT_YSNO", "N");
			moimDetailService.moimJoin(resultGahterData, commandMap);

			Map<String, Object> hashTag = new HashMap<>();

			hashTag.put("MOIM_CNTT", resultGahterData.get("MOIM_CNTT"));
			hashTag.put("MOIM_IDXX", gathNumb);

			commonService.tagInsert(hashTag);

			return ResponseEntity.ok(gathNumb);

		} catch (Exception e) {

			System.out.println("error : " + e.getMessage());

			return ResponseEntity.ok("fail");
		}

	}

	// 수정 폼
	@RequestMapping(value = "/gather/modifyMoim.com")
	public ModelAndView modifyGatherForm(@RequestParam(value = "idx", required = false) String MOIM_IDXX, CommandMap commandMap, HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView("/moimGather/makeGather");
		mv.setViewName("makeGather");

		List<Map<String, Object>> cate = commonService.getCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);
		
		commandMap.put("USER_NUMB",session.getAttribute("USER_NUMB"));

		List<Map<String, Object>> notify = notifyService.getNotify(commandMap.getMap(), commandMap, session);
		
		commandMap.put("MOIM_IDXX", MOIM_IDXX);
		
		mv.addObject("moim", gatherService.getGatherDetail(commandMap.getMap(), session, commandMap));
		mv.addObject("img", gatherService.getGatherImg(commandMap.getMap(), commandMap)); // 게더 이미지
		mv.addObject("notify", notify);
		mv.addObject("notiCount", notify.size());
		

		mv.addObject("cate", cate);
		mv.addObject("regi", regi);

		return mv;
	}
}
