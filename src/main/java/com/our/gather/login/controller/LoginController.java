package com.our.gather.login.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.our.gather.common.common.CommandMap;
import com.our.gather.login.dao.NaverLoginVO;
import com.our.gather.login.service.LoginService;

@Controller
public class LoginController {

	@Resource(name = "LoginService")
	private LoginService loginService;

	private NaverLoginVO naverLoginVO;
	private String apiResult = null;

	@Autowired
	private void setNaverLoginVO(NaverLoginVO naverLoginVo) {
		this.naverLoginVO = naverLoginVo;
	}

	// 로그인 폼
	@RequestMapping(value = "/gather/login.com", method = RequestMethod.GET)
	public ModelAndView loginForm(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/login/login");
		mv.setViewName("login");

		List<Map<String, Object>> loginBackImg = loginService.loginBackImg(commandMap.getMap());
		mv.addObject("Bimag", loginBackImg);

		return mv;
	}

	// 아이디 중복 검사
	@RequestMapping(value = "/gather/loginCheck.com", method = RequestMethod.POST)
	@ResponseBody
	public int checkId(@RequestBody HashMap<String, Object> param) throws Exception {

		int result = loginService.loginCheck(param); // 중복이면 0, 사용가능이면 1

		return result;
	}

	// 로그인 처리
	@RequestMapping(value = "/gather/loginDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView login(@RequestBody HashMap<String, Object> param, CommandMap commandMap, HttpSession session,
			HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");
		
		String naverAuthUrl = naverLoginVO.getAuthorizationUrl(session);

		System.out.println("네이버:" + naverAuthUrl);

		mv.addObject("urlNaver", naverAuthUrl);

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
			System.out
					.println("DateTime:" + now.format(formatter) + "\nUSER_NUMB :" + session.getAttribute("USER_NUMB"));
			System.out.println("<------------------------------------------------------>");

		} else {
			mv.addObject("result", null);
			System.out.println("<------------------Login Fail...------------------>");
		}

		return mv;
	}

	// 네이버 로그인 & 회원정보(이름) 가져오기
	@RequestMapping(value = "/gather/naverLoginDo.com", produces = "application/json;charset=utf-8", method = {
			RequestMethod.GET, RequestMethod.POST })
	public ModelAndView naverLogin(@RequestParam String code, @RequestParam String state, HttpSession session)
			throws IOException {
		ModelAndView mv = new ModelAndView();

		OAuth2AccessToken oauthToken;
		oauthToken = naverLoginVO.getAccessToken(session, code, state);

		// 로그인한 사용자의 모든 정보가 JSON타입으로 저장되어 있음
		apiResult = naverLoginVO.getUserProfile(oauthToken);

		// 내가 원하는 정보 (이름)만 JSON타입에서 String타입으로 바꿔 가져오기 위한 작업
		JSONParser parser = new JSONParser();
		Object obj = null;
		try {
			obj = parser.parse(apiResult);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		JSONObject jsonobj = (JSONObject) obj;
		JSONObject response = (JSONObject) jsonobj.get("response");
		String nname = (String) response.get("name");
		String nemail = (String) response.get("email");
		String ngender = (String) response.get("gender");
		String nbirthday = (String) response.get("birthday");
		String nage = (String) response.get("age");
		String nimage = (String) response.get("profile_image");

		// 로그인&아웃 하기위한 세션값 주기
		session.setAttribute("USER_NAME", nname);
		session.setAttribute("USER_IDXX", nemail);
		session.setAttribute("USER_GENR", ngender);
		session.setAttribute("USER_BIRTH", nbirthday);
		session.setAttribute("USER_AGEE", nage);
		session.setAttribute("USER_IMAG", nimage);

		// 네이버 로그인 성공 페이지 View 호출
		mv.setViewName("/gather.com");
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
