package com.our.gather.join.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.join.service.joinService;




@Controller
public class joinController {
	
	 @Resource(name="joinService")
	   private joinService joinService;
	 
	 //회원가입 처리
	   @RequestMapping(value = "/gather/joinDo.sosu", method = RequestMethod.POST)
	   public ModelAndView userJoin(CommandMap commandMap, HttpServletRequest request) throws Exception {

	      ModelAndView mv = new ModelAndView("main_layout");

	      joinService.userJoin(commandMap.getMap(),request);

	      return mv;

	 }
}
