package com.our.gather.main.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.main.service.MainService;


@Controller
public class MainController {

	@Resource(name = "MainService")
	private MainService mainService;

	@RequestMapping(value = "/gather.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
			@RequestParam(value = "cate", required = false) String CATE_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/mainPage/mainPage");
		mv.setViewName("mainPage");
		
		List<Map<String, Object>> pCate = mainService.pCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> cCate = mainService.cCate(commandMap.getMap(), commandMap);
		mv.addObject("pCate",pCate);
		mv.addObject("cCate",cCate);

		if (LIST_TYPE == null && CATE_IDXX == null) {

			if (session.getAttribute("USER_NUMB") != null) {
				
				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				mv.addObject("loginGather", mainService.loginMainGather(commandMap.getMap(), session, commandMap)); // 로그인시 게더메인

			} else {
				
				mv.addObject("loginGather", mainService.loginMainGather(commandMap.getMap(), session, commandMap)); // 비로그인시 게더메인
			}
			
		} else if(LIST_TYPE == null && CATE_IDXX != null){
			ModelAndView mv2 = new ModelAndView("/listPage/list");
			mv2.setViewName("list");
			mv2.addObject("list", mainService.getGather(commandMap.getMap(), session, commandMap)); // 게더

			return mv2;
		
		}
		
		if (LIST_TYPE == "CB") {
			
			ModelAndView cbmv = new ModelAndView("redirect:/gather.com/club");
			return cbmv;

		}
		
		if (LIST_TYPE == "CH") {
			
			ModelAndView chmv = new ModelAndView("redirect:/gather.com/challenge");
			return chmv;
		
		}

		return mv;
	}

}