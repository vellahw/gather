package com.our.gather.loginPage.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
import com.our.gather.join.service.JoinService;
import com.our.gather.loginPage.dao.KakaoLoginVO;
import com.our.gather.loginPage.dao.NaverLoginVO;
import com.our.gather.loginPage.service.LoginService;

@Controller
public class LoginController {

	@Resource(name = "LoginService")
	private LoginService loginService;

	@Resource(name = "JoinService")
	private JoinService joinService;

	private NaverLoginVO naverLoginVO;
	private String apiResult = null;

	@Autowired
	private void setNaverLoginVO(NaverLoginVO naverLoginVo) {
		this.naverLoginVO = naverLoginVo;
	}
	
	@Autowired
	private KakaoLoginVO kakaoLoginVO;

	// 로그인 폼
	@RequestMapping(value = "/gather/login.com", method = RequestMethod.GET)
	public ModelAndView loginForm(CommandMap commandMap, HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView("/login/login");
		mv.setViewName("login");

		String naverAuthUrl = naverLoginVO.getAuthorizationUrl(session);
		mv.addObject("urlNaver", naverAuthUrl);
		
		String kakaoAuthUrl = kakaoLoginVO.getAuthorizationUrl(session);	
		mv.addObject("urlKakao", kakaoAuthUrl);

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

		int result = loginService.loginCheck(param);

		// 로그인 성공 시 세션값 저장
		if (result != 0) {

			Map<String, Object> map = loginService.login(param);

			LocalDate today = LocalDate.now();
			int todayYear = today.getYear();

			String Jumin1 = (String) map.get("USER_BIRTH");
			int Jumin2 = Integer.parseInt(String.valueOf(map.get("USER_JUMIN2")));

			int userYear = Integer.parseInt(String.valueOf(Jumin1.substring(0, 2)));

			if (Jumin2 == 1 || Jumin2 == 2) {
				userYear = userYear + 1900;

			} else if (Jumin2 == 3 || Jumin2 == 4) {
				userYear += 2000;
			} else if (Jumin2 == 0 || Jumin2 == 9) {
				userYear += 1800;
			}

			int tmpAge = todayYear - userYear;

			if (map.get("BANN_YSNO").equals("Y")) { // 정지된 사용자

				mv.addObject("USER_NICK", map.get("USER_NICK"));
				mv.addObject("BANN_STRT", map.get("BANN_STRT")); // 정지 시작일
				mv.addObject("BANN_ENDD", map.get("BANN_ENDD")); // 정지 종료일
				mv.addObject("BANN_CNTT", map.get("BANN_CNTT")); // 정지 사유

				System.out.println("<------------USERNUMB:" + map.get("USER_NUMB") + " is banned------------------>");

				mv.addObject("result", "fail");

			} else {

				session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
				session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
				session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
				session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
				session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
				session.setAttribute("USER_IMAG", map.get("USER_IMAG")); // 회원 프로필사진
				session.setAttribute("USER_BIRTH", map.get("USER_BIRTH")); // 회원생일
				session.setAttribute("USER_JUMIN2", map.get("USER_JUMIN2")); // 회원 주민번호 뒷자리
				session.setAttribute("USER_AGEE", tmpAge); // 회원나이
				session.setAttribute("REGI_NUMB", map.get("REGI_NUMB")); // 회원 주민등록번호
				session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별

				mv.addObject("USER_NUMB", session.getAttribute("USER_NUMB"));
				mv.addObject("USER_TYPE", session.getAttribute("USER_TYPE"));
				mv.addObject("TYPE_CODE", session.getAttribute("TYPE_CODE"));
				mv.addObject("USER_NAME", session.getAttribute("USER_NAME"));
				mv.addObject("USER_NICK", session.getAttribute("USER_NICK"));
				mv.addObject("USER_IMAG", session.getAttribute("USER_IMAG"));
				mv.addObject("USER_BIRTH", session.getAttribute("USER_BIRTH"));
				mv.addObject("USER_JUMIN2", session.getAttribute("USER_JUMIN2"));
				mv.addObject("USER_AGEE", session.getAttribute("USER_AGEE"));
				mv.addObject("REGI_NUMB", session.getAttribute("REGI_NUMB"));
				mv.addObject("USER_GNDR", session.getAttribute("USER_GNDR"));

				LocalDateTime now = LocalDateTime.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				System.out.println("<------------------------------Login Success!!!!!-------------------------->");
				System.out.println(
						"DateTime:" + now.format(formatter) + "\nUSER_NUMB :" + session.getAttribute("USER_NUMB"));
				System.out.println("<-------------------------------------------------------------------------->");

				mv.addObject("result", "success");
			}

		} else {

			mv.addObject("result", null);
			System.out.println("<--------------------------------Login Fail...----------------------------->");

		}

		return mv;
	}

	// 네이버 로그인 & 회원정보(이름) 가져오기
	@RequestMapping(value = "/gather/naverLoginDo.com", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView naverLogin(@RequestParam String code, @RequestParam String state, HttpSession session,
			CommandMap commandMap, HttpServletRequest request) throws Exception {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("redirect:/gather/login.com");

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

		naverLogin.put("USER_IDXX", response.get("email"));
		naverLogin.put("PASS_WORD", passwordString);

		int result = loginService.loginCheck(naverLogin);

		if (result == 0) { //첫 로그인 시 가입 후 로그인 처리

			commandMap.put("USER_NAME", response.get("name"));
			commandMap.put("REGI_NUMB", firstSevenDigits);
			commandMap.put("USER_NICK", response.get("nickname"));
			commandMap.put("USER_IDXX", response.get("email"));
			commandMap.put("PASS_WORD", passwordString);
			commandMap.put("CELL_NUMB", CELL_NUMB);
			commandMap.put("SELF_INTR", "");
			commandMap.put("QUST_CODE", "N/A");
			commandMap.put("ANSR_CODE", "N/A");
			commandMap.put("FILE_SVNM", response.get("profile_image"));

			joinService.userJoin(commandMap.getMap(), commandMap, request);
			
			Map<String, Object> map = loginService.login(naverLogin);
			
			session.setAttribute("api", "naver"); // 회원번호
			session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
			session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
			session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
			session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
			session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
			session.setAttribute("USER_IMAG", response.get("profile_image")); // 회원 프로필사진
			session.setAttribute("USER_BIRTH", map.get("USER_BIRTH")); // 회원생일
			session.setAttribute("USER_JUMIN2", map.get("USER_JUMIN2")); // 회원 주민번호 뒷자리
			session.setAttribute("USER_AGEE", age); // 회원나이
			session.setAttribute("REGI_NUMB", map.get("REGI_NUMB")); // 회원 주민등록번호
			session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별
			
			mv.addObject("api", "naver");
			mv.addObject("firstTime", "Y");
			mv.addObject("result", "success");
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
			
			
		} else {

			Map<String, Object> map = loginService.login(naverLogin);
			
			if (map.get("BANN_YSNO").equals("Y")) { // 정지된 사용자

				mv.addObject("api", "naver");
				mv.addObject("USER_NICK", map.get("USER_NICK"));
				mv.addObject("BANN_STRT", map.get("BANN_STRT")); // 정지 시작일
				mv.addObject("BANN_ENDD", map.get("BANN_ENDD")); // 정지 종료일
				mv.addObject("BANN_CNTT", map.get("BANN_CNTT")); // 정지 사유
				
				System.out.println("<------------USERNUMB:" + map.get("USER_NUMB") + " is banned------------------>");

				mv.addObject("result", "fail");

			} else {
				
				session.setAttribute("api", "naver"); // 회원번호
				session.setAttribute("USER_NUMB", map.get("USER_NUMB")); // 회원번호
				session.setAttribute("USER_TYPE", map.get("USER_TYPE")); // 회원타입(사용자, 개발자, 운영자)
				session.setAttribute("TYPE_CODE", map.get("TYPE_CODE")); // 회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
				session.setAttribute("USER_NAME", map.get("USER_NAME")); // 회원이름
				session.setAttribute("USER_NICK", map.get("USER_NICK")); // 회원 닉네임
				session.setAttribute("USER_IMAG", response.get("profile_image")); // 회원 프로필사진
				session.setAttribute("USER_BIRTH", map.get("USER_BIRTH")); // 회원생일
				session.setAttribute("USER_JUMIN2", map.get("USER_JUMIN2")); // 회원 주민번호 뒷자리
				session.setAttribute("USER_AGEE", age); // 회원나이
				session.setAttribute("REGI_NUMB", map.get("REGI_NUMB")); // 회원 주민등록번호
				session.setAttribute("USER_GNDR", map.get("USER_GNDR")); // 회원성별
				
				mv.addObject("api", "naver");
				mv.addObject("firstTime", "N");
				mv.addObject("result", "success");
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
				
			}
		
		}
		
		// 네이버 로그인 성공 페이지 View 호출
		return mv;
	}
	
	// 카카오 로그인 성공시 callback
	@RequestMapping(value = "/gather/kakaoLoginDo.com", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView kakaoLogin( @RequestParam String code, @RequestParam String state, HttpSession session) 
			throws Exception {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("redirect:/gather.com");
		
		System.out.println("로그인 성공 callbackKakao");
		OAuth2AccessToken oauthToken;
		oauthToken = kakaoLoginVO.getAccessToken(session, code, state);	
		// 로그인 사용자 정보를 읽어온다
		apiResult = kakaoLoginVO.getUserProfile(oauthToken);
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObj;
		
		jsonObj = (JSONObject) jsonParser.parse(apiResult);
		JSONObject response_obj = (JSONObject) jsonObj.get("kakao_account");	
		JSONObject response_obj2 = (JSONObject) response_obj.get("profile");
		
		// 프로필 조회
		String email = (String) response_obj.get("account_email");
		String nick = (String) response_obj2.get("nickname");
		String profile = (String) response_obj2.get("profile_image_url");

		session.setAttribute("api", "kakao");
		session.setAttribute("signIn", apiResult);
		session.setAttribute("USER_NUMB", "임시키");
		session.setAttribute("USER_IDXX", email);
		session.setAttribute("USER_NICK", nick);
		session.setAttribute("USER_IMAG", profile);

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
