package com.our.gather.main.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.main.service.mainService;




@Controller
public class mainController {
	
	 @Resource(name="mainService")
	   private mainService mainService;
	 
	 @RequestMapping(value = "/gather.com")
	   public ModelAndView main(HttpSession session, CommandMap commandMap, Model model) throws Exception {
		 
		  ModelAndView mv = new ModelAndView("/mainPage/mainPage");
		  
	      List<Map<String, Object>> list  = mainService.menuList(commandMap.getMap(), session, commandMap);
	      
	      mv.addObject("list", list);
	      
	      return mv;
	   

	 }
}