package com.our.gather.gather.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.common.utils.CommonUtils;
import com.our.gather.gather.service.GatherService;

@Controller
public class GatherController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "GatherService")
	private GatherService gatherService;

	@RequestMapping(value = "/gatherDetail.com")
	public ModelAndView main(@RequestParam(value = "idx", required = false) String MOIM_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/detailPage/detailPage");
		mv.setViewName("detailPage");

		commandMap.put("MOIM_IDXX", MOIM_IDXX);
		mv.addObject("detail", gatherService.getGatherDetail(commandMap.getMap(), session, commandMap)); // 게더
		mv.addObject("member", gatherService.getGatherMember(commandMap.getMap(), session, commandMap)); // 게더맴버
		mv.addObject("img", commonService.getMoimImg(commandMap.getMap(), commandMap)); // 게더 이미지
		
		if(session.getAttribute("USER_NUMB") != null) {
			
			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			mv.addObject("yourState", gatherService.getGatherYourState(commandMap.getMap(), session, commandMap)); //로그인시 회원의 현재 모임 참여상태.
			
		}
		
		return mv;
	}

}
