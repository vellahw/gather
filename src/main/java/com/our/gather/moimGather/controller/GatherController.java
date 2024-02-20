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
			
			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			// JSON 데이터 처리
			ObjectMapper objectMapper = new ObjectMapper();

			Map<String, Object> resultGahterData = objectMapper.readValue(gatherData, new TypeReference<Map<String, Object>>() {});
			
			Map<String, Object> resultMapData = objectMapper.readValue(mapData, new TypeReference<Map<String, Object>>() {});
			
			String[] moimRegi = ((String) resultMapData.get("MOIM_ADR1")).split(" ");
			
			String pRegi = moimRegi[0].substring(0, 2);
			
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
			
			String cRegi = moimRegi[1].substring(0, 2);
			
			regiMap.put("COMD_NAME", cRegi);
			
			Map<String, Object> resultRegi = commonService.searchRegi(regiMap, commandMap);
			
			resultGahterData.put("REGI_CODE", resultRegi.get("COMD_CODE"));

			gatherService.makeGather(resultGahterData, commandMap, request, session);
			
			String gathNumb = (String) commandMap.get("GATH_IDXX");
			
			resultMapData.put("MOIM_IDXX", gathNumb);
			
			commonService.mapInsert(resultMapData, commandMap);

			return ResponseEntity.ok("success");
			
		} catch (Exception e) {
			
			System.out.println("error : " + e.getMessage());
			
			return ResponseEntity.ok("fail");
		}
	}

}
