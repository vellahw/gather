package com.our.gather.join.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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

	@Resource(name = "joinService")
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
	public Map<String, Object> checkNickname(@RequestBody HashMap<String, Object> param) throws Exception {

		Map<String, Object> result = joinService.checkNick(param);

		return result;
	}

	// 회원가입 처리
	@RequestMapping(value = "/gather/joinDo.com", method = RequestMethod.POST)
	public ModelAndView userJoin(CommandMap commandMap, HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("main_layout");

		joinService.userJoin(commandMap.getMap(), request);

		return mv;

	}

}
