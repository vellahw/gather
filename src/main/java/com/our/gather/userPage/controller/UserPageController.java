package com.our.gather.userPage.controller;

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
import com.our.gather.notify.service.NotifyService;
import com.our.gather.userPage.service.UserPageService;

@Controller
public class UserPageController {

	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	@Resource(name = "UserPageService")
	private UserPageService userPageService;

	// 유저 페이지
	@RequestMapping(value = "/gather/userPage.com")
	public ModelAndView main(@RequestParam(value = "idx", required = false) String USER_NUMB, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/userPage/userPage");
		mv.setViewName("userPage");

		commandMap.put("USER_NUMB", USER_NUMB);

		Map<String, Object> userMap = userPageService.userPage(commandMap.getMap(), session, commandMap);
		
		List<Map<String, Object>> userRegi = userPageService.userRegi(commandMap.getMap(), commandMap);

		mv.addObject("user", userMap);
		mv.addObject("userRegi", userRegi);

		return mv;
	}

}
