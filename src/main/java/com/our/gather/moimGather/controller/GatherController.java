package com.our.gather.moimGather.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimGather.service.GatherService;

@Controller
public class GatherController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "GatherService")
	private GatherService gatherService;

	// 개설 폼
	@RequestMapping(value = "/gather/makeGather.com")
	public ModelAndView moimResister(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/moimGather/makeGather");
		mv.setViewName("makeGather");

		List<Map<String, Object>> cate = commonService.getCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);

		mv.addObject("cate", cate);
		mv.addObject("regi", regi);

		return mv;
	}

	//게더 개설
	@RequestMapping(value = "/gather/makeGatherDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> makeGather(@RequestParam("data") String gatherData, @RequestParam("map") String mapData , HttpServletRequest request,
			CommandMap commandMap, HttpSession session) throws Exception {

		try {
			
			ObjectMapper objectMapper = new ObjectMapper();

			Map<String, Object> resultGahterData = objectMapper.readValue(gatherData, new TypeReference<Map<String, Object>>() {});
			
			Map<String, Object> resultMapData = objectMapper.readValue(mapData, new TypeReference<Map<String, Object>>() {});
			
			Map<String, Object> regiMap = commonService.extractRegiCode(resultMapData);
			
			String gathNumb = gatherService.makeGatherNumb();
			
			resultGahterData.put("MOIM_IDXX", gathNumb);
			resultGahterData.put("REGI_CODE", regiMap.get("COMD_CODE"));
			resultGahterData.put("USER_NUMB", session.getAttribute("USER_NUMB"));

			gatherService.makeGather(resultGahterData, commandMap, request, session);
			
			resultMapData.put("MOIM_IDXX", gathNumb);
			
			commonService.mapInsert(resultMapData, commandMap);
			
			Map<String, Object> hashTag = new HashMap<>();
			
			hashTag.put("MOIM_CNTT", resultGahterData.get("MOIM_CNTT"));
			hashTag.put("MOIM_IDXX", gathNumb);
			
			commonService.tagInsert(hashTag);

			return ResponseEntity.ok("success");
			
		} catch (Exception e) {
			
			System.out.println("error : " + e.getMessage());
			
			return ResponseEntity.ok("fail");
		}
	}

}