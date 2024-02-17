package com.our.gather.moimGather.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.moimGather.service.GatherService;

@Controller
public class MoimGatherController {
	
	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	@RequestMapping(value = "/gather/register.com")
	public ModelAndView moimResister(CommandMap commandMap) {
		
		ModelAndView mv = new ModelAndView("/moimGather/moimRegister");
		
		return mv;
	}

}
