package com.our.gather.userLoginPage.controller;

import java.time.LocalDate;
import java.time.Period;
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
import com.our.gather.common.service.CommonService;
import com.our.gather.userJoinPage.service.JoinService;
import com.our.gather.userLoginPage.dao.GoogleLoginVO;
import com.our.gather.userLoginPage.dao.KakaoLoginVO;
import com.our.gather.userLoginPage.dao.NaverLoginVO;
import com.our.gather.userLoginPage.service.LoginService;

@Controller
public class LoginController {

	@Resource(name = "LoginService")
	private LoginService loginService;

	@Resource(name = "JoinService")
	private JoinService joinService;

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Autowired
	private NaverLoginVO naverLoginVO;

	@Autowired
	private KakaoLoginVO kakaoLoginVO;

	@Autowired
	private GoogleLoginVO googleLoginVO;

	// 로그인 폼
	@RequestMapping(value = "/gather/login.com", method = RequestMethod.GET)
	public ModelAndView loginForm(CommandMap commandMap, HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView("/login/login");
		mv.setViewName("login");

		String naverAuthUrl = naverLoginVO.getAuthorizationUrl(session);
		mv.addObject("urlNaver", naverAuthUrl);

		String kakaoAuthUrl = kakaoLoginVO.getAuthorizationUrl(session);
		mv.addObject("urlKakao", kakaoAuthUrl);

		String googleAuthUrl = googleLoginVO.getAuthorizationUrl(session);
		mv.addObject("urlGoogle", googleAuthUrl);

		List<Map<String, Object>> getRegi = commonService.getRegi(commandMap.getMap(), commandMap);
		mv.addObject("regi", getRegi);

		List<Map<String, Object>> loginBackImg = loginService.loginBackImg(commandMap.getMap());
		mv.addObject("Bimag", loginBackImg);

		return mv;
	}

	// 아이디 중복 검사
	@RequestMapping(value = "/gather/loginCheck.com", method = RequestMethod.POST)
	@ResponseBody
	public int checkId(@RequestBody HashMap<String, Object> param) throws Exception {

		int result = loginService.loginCheck(param); // 중복이면 1, 사용 가능이면 0

		return result;
	}

	// 로그인 처리
	@RequestMapping(value = "/gather/loginDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView login(@RequestBody HashMap<String, Object> param, CommandMap commandMap, HttpSession session,
			HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");
		Long lockedUntil = (Long) session.getAttribute("LOGIN_LOCKED_UNTIL");
		if (lockedUntil != null && lockedUntil > System.currentTimeMillis()) {
			mv.addObject("result", "locked");
			return mv;
		}

		Map<String, Object> map = loginService.login(param);

		if (map != null) {
			session.removeAttribute("LOGIN_FAILURES");
			session.removeAttribute("LOGIN_LOCKED_UNTIL");
			if ("Y".equals(map.get("BANN_YSNO"))) { // 정지된 사용자

				mv.addObject("USER_NICK", map.get("USER_NICK"));
				mv.addObject("BANN_STRT", map.get("BANN_STRT")); // 정지 시작일
				mv.addObject("BANN_ENDD", map.get("BANN_ENDD")); // 정지 종료일
				mv.addObject("BANN_CNTT", map.get("BANN_CNTT")); // 정지 사유

				mv.addObject("result", "fail");

			} else {
				request.changeSessionId();
				storeBasicSession(map, session);

				mv.addObject("USER_NUMB", session.getAttribute("USER_NUMB"));
				mv.addObject("USER_TYPE", session.getAttribute("USER_TYPE"));
				mv.addObject("TYPE_CODE", session.getAttribute("TYPE_CODE"));
				mv.addObject("USER_NAME", session.getAttribute("USER_NAME"));
				mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
				mv.addObject("USER_IMAG", session.getAttribute("USER_IMAG"));
				mv.addObject("USER_AGEE", session.getAttribute("USER_AGEE"));
				mv.addObject("USER_GNDR", session.getAttribute("USER_GNDR"));

				mv.addObject("result", "success");
			}

		} else {

			Integer failures = (Integer) session.getAttribute("LOGIN_FAILURES");
			failures = failures == null ? 1 : failures + 1;
			session.setAttribute("LOGIN_FAILURES", failures);
			if (failures >= 5) {
				session.setAttribute("LOGIN_LOCKED_UNTIL", System.currentTimeMillis() + 300000L);
				mv.addObject("result", "locked");
				return mv;
			}
			mv.addObject("result", null);
		}

		return mv;
	}

	// 네이버 로그인 & 회원정보(이름) 가져오기
	@RequestMapping(value = "/gather/naverLoginDo.com", method = RequestMethod.GET)
	public ModelAndView naverLogin(@RequestParam String code, @RequestParam String state, HttpSession session,
			CommandMap commandMap, HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("redirect:/gather/login.com");

		OAuth2AccessToken oauthToken;
		oauthToken = naverLoginVO.getAccessToken(session, code, state);

		// 로그인한 사용자의 모든 정보가 JSON타입으로 저장되어 있음
		String apiResult = naverLoginVO.getUserProfile(oauthToken);

		// 내가 원하는 정보 (이름)만 JSON타입에서 String타입으로 바꿔 가져오기 위한 작업
		JSONParser parser = new JSONParser();
		Object obj = null;
		try {
			obj = parser.parse(apiResult);
		} catch (ParseException e) {
			throw new IllegalStateException("Invalid Naver profile response", e);
		}
		JSONObject jsonobj = (JSONObject) obj;
		JSONObject response = (JSONObject) jsonobj.get("response");
		if (response == null || response.get("id") == null || response.get("email") == null
				|| response.get("name") == null || response.get("nickname") == null
				|| response.get("gender") == null || response.get("birthday") == null
				|| response.get("birthyear") == null || response.get("mobile") == null
				|| !String.valueOf(response.get("email")).matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
			throw new IllegalStateException("Naver did not return a usable account");
		}

		String ngender = (String) response.get("gender");
		String nbirthday = (String) response.get("birthday");
		String birthYear = (String) response.get("birthyear");
		String mobile = (String) response.get("mobile");

		String[] phoneNumParts = mobile.split("-");
		String first = phoneNumParts[0];
		String second = phoneNumParts[1];
		String third = phoneNumParts[2];
		String CELL_NUMB = first + second + third;

		// 성별에 따른 주민등록번호 앞자리 숫자 설정
		int genderCode = (ngender.equals("M")) ? 1 : 2;

		// 2000년 이후 출생자의 주민등록번호 앞자리 생성
		if (Integer.parseInt(birthYear) >= 2000) {
			genderCode += 2; // 2000년 이후 출생자의 성별 코드
		}

		// 생년월일에서 월과 일을 분리
		String[] birthdayParts = nbirthday.split("-");
		String month = birthdayParts[0];
		String day = birthdayParts[1];

		// 주민등록번호 앞자리 생성
		String firstSevenDigits = birthYear.substring(2) + month + day + genderCode;

		// 현재 나이 계산
		LocalDate birthday = LocalDate.parse(birthYear + "-" + nbirthday, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		int age = Period.between(birthday, LocalDate.now()).getYears();

		String passwordString = "NAVER:" + response.get("id");

		Map<String, Object> naverLogin = new HashMap<>();

		String naverEmail = String.valueOf(response.get("email")).trim().toLowerCase(java.util.Locale.ROOT);
		naverLogin.put("USER_IDXX", naverEmail);
		naverLogin.put("PASS_WORD", passwordString);

		int result = loginService.loginCheck(naverLogin);

		if (result == 0) { // 첫 로그인 시 가입 후 로그인 처리

			commandMap.put("USER_NAME", response.get("name"));
			commandMap.put("REGI_NUMB", firstSevenDigits);
			commandMap.put("USER_NICK", response.get("nickname"));
			commandMap.put("USER_IDXX", naverEmail);
			commandMap.put("PASS_WORD", passwordString);
			commandMap.put("CELL_NUMB", CELL_NUMB);
			commandMap.put("SELF_INTR", "");
			commandMap.put("QUST_CODE", "N/A");
			commandMap.put("ANSR_CODE", "N/A");
			commandMap.put("FILE_SVNM", response.get("profile_image"));

			joinService.userJoin(commandMap.getMap(), commandMap, request, session);

			Map<String, Object> map = loginService.login(naverLogin);

			session.setAttribute("api", "naver"); // 회원번호
			session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
			session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
			session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
			session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
			session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
			session.setAttribute("USER_IMAG", response.get("profile_image")); // 회원 프로필사진
			session.setAttribute("USER_AGEE", age); // 회원나이
			session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별

			mv.addObject("api", "naver");
			mv.addObject("firstTime", "Y");
			mv.addObject("USER_NUMB", session.getAttribute("USER_NUMB"));
			mv.addObject("USER_TYPE", session.getAttribute("USER_TYPE"));
			mv.addObject("TYPE_CODE", session.getAttribute("TYPE_CODE"));
			mv.addObject("USER_NAME", session.getAttribute("USER_NAME"));
			mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
			mv.addObject("USER_IMAG", response.get("profile_image"));
			mv.addObject("USER_BIRTH", session.getAttribute("USER_BIRTH"));
			mv.addObject("USER_JUMIN2", session.getAttribute("USER_JUMIN2"));
			mv.addObject("USER_AGEE", session.getAttribute("USER_AGEE"));
			mv.addObject("REGI_NUMB", session.getAttribute("REGI_NUMB"));
			mv.addObject("USER_GNDR", session.getAttribute("USER_GNDR"));

			mv.addObject("result", "success");

		} else {

			Map<String, Object> map = loginService.login(naverLogin);
			if (map == null) {
				return new ModelAndView("redirect:/gather/login.com?error=oauth_account_conflict");
			}

			if (map.get("BANN_YSNO").equals("Y")) { // 정지된 사용자

				mv.addObject("api", "naver");
				mv.addObject("USER_NICK", map.get("USER_NICK"));
				mv.addObject("BANN_STRT", map.get("BANN_STRT")); // 정지 시작일
				mv.addObject("BANN_ENDD", map.get("BANN_ENDD")); // 정지 종료일
				mv.addObject("BANN_CNTT", map.get("BANN_CNTT")); // 정지 사유

				mv.addObject("result", "fail");

			} else {

				session.setAttribute("api", "naver"); // 회원번호
				session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
				session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
				session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
				session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
				session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
				session.setAttribute("USER_IMAG", response.get("profile_image")); // 회원 프로필사진
				session.setAttribute("USER_AGEE", age); // 회원나이
				session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별

				mv.addObject("api", "naver");
				mv.addObject("firstTime", "N");
				mv.addObject("USER_NUMB", session.getAttribute("USER_NUMB"));
				mv.addObject("USER_TYPE", session.getAttribute("USER_TYPE"));
				mv.addObject("TYPE_CODE", session.getAttribute("TYPE_CODE"));
				mv.addObject("USER_NAME", session.getAttribute("USER_NAME"));
				mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
				mv.addObject("USER_IMAG", response.get("profile_image"));
				mv.addObject("USER_BIRTH", session.getAttribute("USER_BIRTH"));
				mv.addObject("USER_JUMIN2", session.getAttribute("USER_JUMIN2"));
				mv.addObject("USER_AGEE", session.getAttribute("USER_AGEE"));
				mv.addObject("REGI_NUMB", session.getAttribute("REGI_NUMB"));
				mv.addObject("USER_GNDR", session.getAttribute("USER_GNDR"));

				mv.addObject("result", "success");

			}

		}

		if ("success".equals(mv.getModel().get("result"))) {
			request.changeSessionId();
			mv.getModel().clear();
			mv.setViewName("redirect:/gather.com");
		} else {
			mv.getModel().clear();
			mv.setViewName("redirect:/gather/login.com?error=banned");
		}

		return mv;
	}

	// 카카오 로그인 성공시 callback
	@RequestMapping(value = "/gather/kakaoLoginDo.com", method = RequestMethod.GET)
	public ModelAndView kakaoLogin(@RequestParam String code, @RequestParam String state, HttpSession session,
			HttpServletRequest request)
			throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("redirect:/gather/login.com");

		OAuth2AccessToken oauthToken;
		oauthToken = kakaoLoginVO.getAccessToken(session, code, state);
		// 로그인 사용자 정보를 읽어온다
		String apiResult = kakaoLoginVO.getUserProfile(oauthToken);

		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObj;

		jsonObj = (JSONObject) jsonParser.parse(apiResult);
		JSONObject response_obj = (JSONObject) jsonObj.get("kakao_account");
		if (response_obj == null) {
			throw new IllegalStateException("Kakao account is unavailable");
		}
		JSONObject response_obj2 = (JSONObject) response_obj.get("profile");
		if (response_obj2 == null || !Boolean.TRUE.equals(response_obj.get("is_email_verified"))) {
			throw new IllegalStateException("Kakao email is not verified");
		}

		String email = ((String) response_obj.get("email")).trim().toLowerCase(java.util.Locale.ROOT);
		String nick = (String) response_obj2.get("nickname");
		String profile = (String) response_obj2.get("profile_image_url");
		if (jsonObj.get("id") == null || email == null || nick == null
				|| !email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
			throw new IllegalStateException("Kakao did not return a usable account");
		}

		Map<String, Object> kakaoLogin = new HashMap<>();

		kakaoLogin.put("USER_IDXX", email);
		kakaoLogin.put("PASS_WORD", "KAKAO:" + jsonObj.get("id"));

		int result = loginService.loginCheck(kakaoLogin);

		if (result == 0) {
			session.setAttribute("SOCIAL_EMAIL", email);
			session.setAttribute("SOCIAL_NICK", nick);
			session.setAttribute("SOCIAL_PASSWORD", kakaoLogin.get("PASS_WORD"));
			session.setAttribute("EMAIL_AUTH_ADDRESS", email);
			session.setAttribute("EMAIL_AUTH_VERIFIED", Boolean.TRUE);
			mv.setViewName("redirect:/gather/login.com?social=kakao");

		} else {

			Map<String, Object> map = loginService.login(kakaoLogin);
			if (map == null) {
				return new ModelAndView("redirect:/gather/login.com?error=oauth_account_conflict");
			}

			if (map.get("BANN_YSNO").equals("Y")) { // 정지된 사용자

				mv.addObject("api", "kakao");
				mv.addObject("USER_NICK", map.get("USER_NICK"));
				mv.addObject("BANN_STRT", map.get("BANN_STRT")); // 정지 시작일
				mv.addObject("BANN_ENDD", map.get("BANN_ENDD")); // 정지 종료일
				mv.addObject("BANN_CNTT", map.get("BANN_CNTT")); // 정지 사유

				mv.addObject("result", "fail");

			} else {

				int tmpAge = calculateAge(map);

				session.setAttribute("api", "kakao"); // 회원번호
				session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
				session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
				session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
				session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
				session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
				session.setAttribute("USER_IMAG", profile); // 회원 프로필사진
				session.setAttribute("USER_AGEE", tmpAge); // 회원나이
				session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별

				mv.addObject("api", "kakao");
				mv.addObject("firstTime", "N");
				mv.addObject("USER_NUMB", session.getAttribute("USER_NUMB"));
				mv.addObject("USER_TYPE", session.getAttribute("USER_TYPE"));
				mv.addObject("TYPE_CODE", session.getAttribute("TYPE_CODE"));
				mv.addObject("USER_NAME", session.getAttribute("USER_NAME"));
				mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
				mv.addObject("USER_IMAG", profile);
				mv.addObject("USER_BIRTH", session.getAttribute("USER_BIRTH"));
				mv.addObject("USER_JUMIN2", session.getAttribute("USER_JUMIN2"));
				mv.addObject("USER_AGEE", session.getAttribute("USER_AGEE"));
				mv.addObject("REGI_NUMB", session.getAttribute("REGI_NUMB"));
				mv.addObject("USER_GNDR", session.getAttribute("USER_GNDR"));

				mv.addObject("result", "success");

			}

		}

		if (result != 0 && "success".equals(mv.getModel().get("result"))) {
			request.changeSessionId();
			mv.getModel().clear();
			mv.setViewName("redirect:/gather.com");
		} else if (result != 0) {
			mv.getModel().clear();
			mv.setViewName("redirect:/gather/login.com?error=banned");
		}

		return mv;
	}

	@RequestMapping(value = "/gather/googleLoginDo.com", method = RequestMethod.GET)
	public ModelAndView googleLogin(@RequestParam String code, @RequestParam String state, HttpSession session,
			HttpServletRequest request) throws Exception {
		OAuth2AccessToken token = googleLoginVO.getAccessToken(session, code, state);
		@SuppressWarnings("unchecked")
		Map<String, Object> profile = new ObjectMapper().readValue(googleLoginVO.getUserProfile(token), Map.class);
		if (!Boolean.TRUE.equals(profile.get("email_verified"))) {
			return new ModelAndView("redirect:/gather/login.com?error=oauth");
		}
		String email = String.valueOf(profile.get("email")).trim().toLowerCase(java.util.Locale.ROOT);
		if (profile.get("sub") == null || !email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
			return new ModelAndView("redirect:/gather/login.com?error=oauth");
		}
		Map<String, Object> credentials = new HashMap<>();
		credentials.put("USER_IDXX", email);
		credentials.put("PASS_WORD", "GOOGLE:" + profile.get("sub"));
		Map<String, Object> user = loginService.login(credentials);
		if (user == null) {
			if (loginService.loginCheck(credentials) > 0) {
				return new ModelAndView("redirect:/gather/login.com?error=oauth_account_conflict");
			}
			session.setAttribute("SOCIAL_EMAIL", email);
			session.setAttribute("SOCIAL_NICK", profile.get("name"));
			session.setAttribute("SOCIAL_PASSWORD", credentials.get("PASS_WORD"));
			session.setAttribute("EMAIL_AUTH_ADDRESS", email);
			session.setAttribute("EMAIL_AUTH_VERIFIED", Boolean.TRUE);
			return new ModelAndView("redirect:/gather/login.com?social=google");
		}
		if ("Y".equals(user.get("BANN_YSNO"))) {
			return new ModelAndView("redirect:/gather/login.com?error=banned");
		}
		request.changeSessionId();
		storeBasicSession(user, session);
		return new ModelAndView("redirect:/gather.com");
	}

	private void storeBasicSession(Map<String, Object> user, HttpSession session) {
		session.setAttribute("USER_NUMB", user.get("USER_NUMB"));
		session.setAttribute("USER_TYPE", user.get("USER_TYPE"));
		session.setAttribute("TYPE_CODE", user.get("TYPE_CODE"));
		session.setAttribute("USER_NAME", user.get("USER_NAME"));
		session.setAttribute("USER_NICK", user.get("USER_NICK"));
		session.setAttribute("USER_IMAG", user.get("USER_IMAG"));
		session.setAttribute("USER_GNDR", user.get("USER_GNDR"));
		session.setAttribute("USER_AGEE", calculateAge(user));
	}

	private int calculateAge(Map<String, Object> user) {
		String birth = String.valueOf(user.get("USER_BIRTH"));
		int genderDigit = Integer.parseInt(String.valueOf(user.get("USER_JUMIN2")));
		int birthYear = Integer.parseInt(birth.substring(0, 2));
		birthYear += (genderDigit == 1 || genderDigit == 2) ? 1900
				: (genderDigit == 3 || genderDigit == 4) ? 2000 : 1800;
		LocalDate birthday = LocalDate.of(birthYear, Integer.parseInt(birth.substring(2, 4)),
				Integer.parseInt(birth.substring(4, 6)));
		return Period.between(birthday, LocalDate.now()).getYears();
	}

	@ResponseBody
	@RequestMapping(value = "/gather/session.com", method = RequestMethod.GET)
	public Map<String, Object> currentSession(HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		result.put("authenticated", session.getAttribute("USER_NUMB") != null);
		for (String key : List.of("USER_NUMB", "USER_TYPE", "TYPE_CODE", "USER_NAME", "USER_NICK",
				"USER_IMAG", "USER_AGEE", "USER_GNDR")) {
			result.put(key, session.getAttribute(key));
		}
		return result;
	}

	// 로그아웃
	@RequestMapping(value = "/gather/logoutDo.com", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> logout(HttpSession session) throws Exception {
		session.invalidate();
		return ResponseEntity.ok("success");
	}

}
