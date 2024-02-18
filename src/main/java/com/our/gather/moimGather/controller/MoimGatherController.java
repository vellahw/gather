package com.our.gather.moimGather.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimGather.service.GatherService;

@Controller
public class MoimGatherController {
	
	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	@RequestMapping(value = "/gather/register.com")
	public ModelAndView moimResister(CommandMap commandMap) throws Exception {
		
		ModelAndView mv = new ModelAndView("/moimGather/moimRegister");
		mv.setViewName("moimRegister");
		
		List<Map<String, Object>> cate = commonService.getCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> regi = commonService.getRegi(commandMap.getMap(), commandMap);
		
		mv.addObject("cate", cate);
		mv.addObject("regi", regi);
		
		return mv;
	}

}
