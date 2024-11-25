package com.our.gather.moimMakePage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimMakePage.service.MoimMakeService;
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
public class MoimMakeController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "MoimMakeService")
	private MoimMakeService moimMakeService;


	// 개설 폼
	@RequestMapping(value = "/gather/makeMoim.com")
	public ModelAndView moimResister(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/moim/moimMakePage");
		mv.setViewName("moimMakePage");

		List<Map<String, Object>> cate = commonService.getCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);

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

			Map<String, Object> resultMoimData = objectMapper.readValue(gatherData,
					new TypeReference<Map<String, Object>>() {
					});

			Map<String, Object> resultMapData = objectMapper.readValue(mapData,
					new TypeReference<Map<String, Object>>() {
					});

			commandMap.put("MOIM_TYPE", resultMoimData.get("MOIM_TYPE"));
			String moimNumb = moimMakeService.makeMoimNumb(commandMap.getMap(),commandMap);

			if (!resultMapData.get("MOIM_ADR1").equals("")) {

				resultMapData.get("MOIM_IDXX");
				resultMapData.put("MOIM_IDXX", moimNumb);
				resultMoimData.put("REGI_CODE", commonService.extractRegiCode((String)resultMapData.get("MOIM_ADR1")));
				commonService.mapInsert(resultMapData, commandMap);
			}

			resultMoimData.put("MOIM_IDXX", moimNumb);
			resultMoimData.put("USER_NUMB", session.getAttribute("USER_NUMB"));

			moimMakeService.makeMoim(resultMoimData, commandMap, request, session);

			resultMoimData.put("WAIT_YSNO", "N");
			moimMakeService.moimJoin(resultMoimData, commandMap);

			Map<String, Object> hashTag = new HashMap<>();

			hashTag.put("MOIM_CNTT", resultMoimData.get("MOIM_CNTT"));
			hashTag.put("MOIM_IDXX", moimNumb);

			commonService.tagInsert(hashTag);

			return ResponseEntity.ok(moimNumb);

		} catch (Exception e) {

			System.out.println("error : " + e.getMessage());

			return ResponseEntity.ok("fail");
		}

	}

}
