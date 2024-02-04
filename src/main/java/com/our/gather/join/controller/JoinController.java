package com.our.gather.join.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
	@RequestMapping(value = "/gather/checknickDo.com")
	@ResponseBody
	public ModelAndView checkNickname(@RequestBody HashMap<String, Object> param) throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");

		Map<String, Object> result = joinService.checkNick(param);

		mv.addObject("result", result);

		return mv;
	}
	
	// 회원가입 처리
	@RequestMapping(value = "/gather/joinDo.com", method = RequestMethod.POST)
	public ResponseEntity<String> userJoin(CommandMap commandMap, HttpServletRequest request) throws Exception {

		try {

			joinService.userJoin(commandMap.getMap(), commandMap, request);
			return ResponseEntity.ok("success");

		} catch (Exception e) {

			System.out.println("error : " + e.getMessage());
			return ResponseEntity.ok("fail");
		}

	}

}
