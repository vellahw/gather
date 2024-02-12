package com.our.gather.join.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.join.service.JoinService;

@Controller
public class JoinController {

	@Resource(name = "JoinService")
	private JoinService joinService;

	// 아이디 중복 검사
	@RequestMapping(value = "/gather/checkidDo.com")
	@ResponseBody // 자바객체를 다시 HTTP 응답 바디로 변환
	public Map<String, Object> checkId(@RequestBody HashMap<String, Object> param) throws Exception {

		Map<String, Object> result = joinService.checkId(param);

		return result;
	}

	// 닉네임 중복 검사
	@ResponseBody
	@RequestMapping("/gather/checknickDo.com")
	public ResponseEntity<String> checkNickname(@RequestBody Map<String, Object> param) throws Exception {
		
		Map<String, Object> result = joinService.checkNick(param);
		
		ObjectMapper objectMapper = new ObjectMapper();
		// 데이터를 JSON 문자열로 변환
		String json = objectMapper.writeValueAsString(result);
		
		return ResponseEntity.ok()
			    .contentType(MediaType.APPLICATION_JSON)
			    .body(json);
	}

	@RequestMapping(value = "/gather/joinDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> userJoin(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, CommandMap commandMap) throws Exception {

	    try {
	    	
	        Map<String, Object> param = (Map<String, Object>) requestBody.get("data");
	        List<Map<String, String>> jsonArray = (List<Map<String, String>>) requestBody.get("regi");

	        joinService.userJoin(param, commandMap, request);
	        
	        String userNumb = (String) commandMap.get("USER_NUMB");

	        if (jsonArray != null) {
	        	
	            for (Map<String, String> item : jsonArray) {
	                
	                commandMap.put("USER_NUMB", userNumb);
	                commandMap.put("REGI_CODE", item.get("REGI_CODE"));

	                joinService.insertRegi(commandMap.getMap(), commandMap);
	            }
	        }

	        return ResponseEntity.ok("success");
	    } catch (Exception e) {
	        System.out.println("error : " + e.getMessage());
	        return ResponseEntity.ok("fail");
	    }
	}
}