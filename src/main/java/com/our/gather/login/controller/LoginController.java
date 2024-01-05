package com.our.gather.login.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.print.attribute.standard.PageRanges;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.login.service.LoginService;

@Controller
public class LoginController {

	@Resource(name = "LoginService")
	private LoginService loginService;

	// 로그인 폼
	@RequestMapping(value = "/gather/login.com", method = RequestMethod.GET)
	public ModelAndView loginForm(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/login/login");
		mv.setViewName("login");

		List<Map<String, Object>> loginBackImg = loginService.loginBackImg(commandMap.getMap());
		mv.addObject("Bimag", loginBackImg);

		return mv;
	}

	// 로그인 처리
	@ResponseBody
	@RequestMapping(value = "/gather/loginDo.com", method = RequestMethod.POST)
	public ModelAndView login(@RequestBody HashMap<String, Object> param, CommandMap commandMap, HttpSession session, HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");	
		
		int result = loginService.loginCheck(param);
		
		// 로그인 성공 시 세션값 저장
		if (result != 0) {
			
			Map<String, Object> map = loginService.login(param);
			
			session.setAttribute("USER_NUMB", map.get("USER_NUMB"));
			session.setAttribute("USER_TYPE", map.get("USER_TYPE"));
			session.setAttribute("USER_NAME", map.get("USER_NAME"));
			session.setAttribute("USER_NICK", map.get("USER_NICK"));
			session.setAttribute("USER_IMAG", map.get("USER_IMAG"));
			session.setAttribute("USER_BIRTH", map.get("USER_BIRTH"));
			session.setAttribute("USER_JUMIN2", map.get("USER_JUMIN2"));
			session.setAttribute("REGI_NUMB", map.get("REGI_NUMB"));
			session.setAttribute("USER_GNDR", map.get("USER_GNDR"));
			session.setAttribute("BANN_YSNO", map.get("BANN_YSNO"));
			
			LocalDate today = LocalDate.now();
			int todayYear = today.getYear();
			
			String Jumin1 = (String) session.getAttribute("USER_BIRTH");
			int Jumin2 = Integer.parseInt(String.valueOf(session.getAttribute("USER_JUMIN2")));
			
			int userYear = Integer.parseInt(String.valueOf(Jumin1.substring(0, 2)));
			
			if (Jumin2 == 1 || Jumin2 == 2) {
				userYear = userYear + 1900;
				
			} else if (Jumin2 == 3 || Jumin2 == 4) {
				userYear += 2000;
			} else if (Jumin2 == 0 || Jumin2 == 9) {
				userYear += 1800;
			}
			
			int tmpAge = todayYear - userYear + 1;
			
			session.setAttribute("USER_AGEE", tmpAge);
			
			mv.addObject("result", "success");
			mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
			
			LocalDateTime now = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			System.out.println("<------------------Login Success!!!!!------------------>");
			System.out.println("DateTime:" + now.format(formatter) + "\nUSER_NUMB :" + session.getAttribute("USER_NUMB"));
			System.out.println("<------------------------------------------------------>");
			
		} else {
			mv.addObject("result", null);
			System.out.println("<------------------Login Fail...------------------>");
		}

		return mv;
	}
	

	// 로그아웃
	@RequestMapping(value = "/gather/logoutDo.com", method = RequestMethod.GET)
	public ModelAndView logout(HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView();

		session.invalidate();
		mv.setViewName("redirect:/gather.com");

		return mv;
	}

}
