package com.our.gather.userJoinPage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.userJoinPage.service.JoinService;

@Controller
public class JoinController {

	@Resource(name = "JoinService")
	private JoinService joinService;

	@Autowired
	private JavaMailSender mailSender;

	@Value("${auth.naver.id}")
	private String mailFrom;

	// 아이디 중복 검사
	@RequestMapping(value = "/gather/checkidDo.com", method = RequestMethod.POST)
	@ResponseBody // 자바객체를 다시 HTTP 응답 바디로 변환
	public ResponseEntity<String> checkId(@RequestBody Map<String, Object> param) throws Exception {

		Map<String, Object> result = joinService.checkId(param);

		ObjectMapper objectMapper = new ObjectMapper();
		// 데이터를 JSON 문자열로 변환
		String json = objectMapper.writeValueAsString(result);

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(json);
	}

	// 닉네임 중복 검사
	@ResponseBody
	@RequestMapping(value = "/gather/checknickDo.com", method = RequestMethod.POST)
	public ResponseEntity<String> checkNickname(@RequestBody Map<String, Object> param) throws Exception {

		Map<String, Object> result = joinService.checkNick(param);

		ObjectMapper objectMapper = new ObjectMapper();
		// 데이터를 JSON 문자열로 변환
		String json = objectMapper.writeValueAsString(result);

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(json);
	}
	
	//회원가입
	@RequestMapping(value = "/gather/joinDo.com", method = RequestMethod.POST)
	@ResponseBody
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<String> userJoin(@RequestParam("data") String userData, @RequestParam("regi") String regiData,
			HttpServletRequest request, CommandMap commandMap, HttpSession session) throws Exception {

		try {
			
			String userNumb = joinService.makeUserNumb();
			// JSON 데이터 처리
			ObjectMapper objectMapper = new ObjectMapper();

			Map<String, Object> resultUserData = objectMapper.readValue(userData,
					new TypeReference<Map<String, Object>>() {
					});
			if (!Boolean.TRUE.equals(session.getAttribute("EMAIL_AUTH_VERIFIED"))
					|| !String.valueOf(resultUserData.get("USER_IDXX"))
							.equals(session.getAttribute("EMAIL_AUTH_ADDRESS"))) {
				return ResponseEntity.status(403).body("email_auth_required");
			}
			Object socialPassword = session.getAttribute("SOCIAL_PASSWORD");
			if (socialPassword != null
					&& String.valueOf(resultUserData.get("USER_IDXX")).equals(session.getAttribute("SOCIAL_EMAIL"))) {
				resultUserData.put("PASS_WORD", socialPassword);
			}
			if (!validateAndNormalizeUser(resultUserData, socialPassword != null)) {
				return ResponseEntity.badRequest().body("invalid_user_data");
			}

			List<Map<String, String>> resultRegiData = new ArrayList<>();
			List<Map<String, Object>> regiDataList = objectMapper.readValue(regiData,
					new TypeReference<List<Map<String, Object>>>() {
					});

			if (regiDataList.size() > 10) {
				return ResponseEntity.badRequest().body("invalid_region_data");
			}
			for (Map<String, Object> map : regiDataList) {
				Map<String, String> resultMap = new HashMap<>();
				for (Map.Entry<String, Object> entry : map.entrySet()) {
					resultMap.put(entry.getKey(), entry.getValue().toString());
				}
				if (!String.valueOf(resultMap.get("REGI_CODE")).matches("[0-9A-Za-z_-]{1,20}")) {
					return ResponseEntity.badRequest().body("invalid_region_data");
				}
				resultRegiData.add(resultMap);
			}
			
			resultUserData.put("USER_NUMB", userNumb);
			joinService.userJoin(resultUserData, commandMap, request, session);
			session.removeAttribute("EMAIL_AUTH_CODE");
			session.removeAttribute("EMAIL_AUTH_EXPIRES");
			session.removeAttribute("EMAIL_AUTH_VERIFIED");
			session.removeAttribute("EMAIL_AUTH_ADDRESS");
			session.removeAttribute("SOCIAL_EMAIL");
			session.removeAttribute("SOCIAL_NICK");
			session.removeAttribute("SOCIAL_PASSWORD");

			if (resultRegiData != null) {

				for (Map<String, String> item : resultRegiData) {

					commandMap.put("USER_NUMB", userNumb);
					commandMap.put("REGI_CODE", item.get("REGI_CODE"));

					joinService.insertRegi(commandMap.getMap(), commandMap);
				}
			}

			return ResponseEntity.ok("success");
		} catch (Exception e) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return ResponseEntity.status(400).body("fail");
		}
	}

	@ResponseBody
	@RequestMapping(value = "/gather/mailCheck", method = RequestMethod.POST)
	public ResponseEntity<String> emailAuth(@RequestBody Map<String, String> body, HttpSession session) throws Exception {
		String email = body.get("email");
		if (email != null) {
			email = email.trim().toLowerCase(java.util.Locale.ROOT);
		}
		if (email == null || email.length() > 254 || !email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
			return ResponseEntity.badRequest().body("fail");
		}
		Map<String, Object> duplicateCheck = new HashMap<>();
		duplicateCheck.put("USER_IDXX", email);
		Map<String, Object> duplicate = joinService.checkId(duplicateCheck);
		if (duplicate != null && "1".equals(String.valueOf(duplicate.get("RESULT")))) {
			return ResponseEntity.status(409).body("already_registered");
		}
		Long lastSent = (Long) session.getAttribute("EMAIL_AUTH_LAST_SENT");
		if (lastSent != null && System.currentTimeMillis() - lastSent < 60000L) {
			return ResponseEntity.status(429).body("rate_limited");
		}
		int checkNum = 100000 + new java.security.SecureRandom().nextInt(900000);
		session.setAttribute("EMAIL_AUTH_ADDRESS", email);
		session.setAttribute("EMAIL_AUTH_CODE", Integer.toString(checkNum));
		session.setAttribute("EMAIL_AUTH_EXPIRES", System.currentTimeMillis() + 300000L);
		session.setAttribute("EMAIL_AUTH_LAST_SENT", System.currentTimeMillis());
		session.setAttribute("EMAIL_AUTH_ATTEMPTS", 0);
		session.removeAttribute("EMAIL_AUTH_VERIFIED");

		/* 이메일 보내기 */
		String toMail = email;
		String title = "'GATHER'인증 이메일 입니다.";
		String content = "'GATHER'를 방문해주셔서 감사합니다." + "<br><br>" + "인증 번호는 [ " + checkNum + " ] 입니다." + "<br>"
				+ "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(mailFrom);
			helper.setTo(toMail);
			helper.setSubject(title);
			helper.setText(content, true);
			mailSender.send(message);

		} catch (Exception e) {

			return ResponseEntity.status(502).body("fail");

		}

		return ResponseEntity.ok("sent");

	}

	@ResponseBody
	@RequestMapping(value = "/gather/mailVerify", method = RequestMethod.POST)
	public ResponseEntity<String> emailVerify(@RequestBody Map<String, String> body, HttpSession session) {
		Integer attempts = (Integer) session.getAttribute("EMAIL_AUTH_ATTEMPTS");
		if (attempts != null && attempts >= 5) {
			return ResponseEntity.status(429).body("too_many_attempts");
		}
		String expectedEmail = (String) session.getAttribute("EMAIL_AUTH_ADDRESS");
		String expectedCode = (String) session.getAttribute("EMAIL_AUTH_CODE");
		Long expires = (Long) session.getAttribute("EMAIL_AUTH_EXPIRES");
		boolean valid = expectedEmail != null && expectedEmail.equals(body.get("email"))
				&& expectedCode != null && expectedCode.equals(body.get("code"))
				&& expires != null && expires >= System.currentTimeMillis();
		if (!valid) {
			session.setAttribute("EMAIL_AUTH_ATTEMPTS", attempts == null ? 1 : attempts + 1);
			return ResponseEntity.status(400).body("invalid");
		}
		session.setAttribute("EMAIL_AUTH_VERIFIED", Boolean.TRUE);
		session.removeAttribute("EMAIL_AUTH_CODE");
		return ResponseEntity.ok("verified");
	}

	private boolean validateAndNormalizeUser(Map<String, Object> user, boolean socialJoin) {
		String email = String.valueOf(user.get("USER_IDXX")).trim().toLowerCase(java.util.Locale.ROOT);
		String password = String.valueOf(user.get("PASS_WORD"));
		String name = String.valueOf(user.get("USER_NAME")).trim();
		String nickname = String.valueOf(user.get("USER_NICK")).trim();
		String residentPrefix = String.valueOf(user.get("REGI_NUMB")).trim();
		String phone = String.valueOf(user.get("CELL_NUMB")).replaceAll("[^0-9]", "");
		String intro = user.get("SELF_INTR") == null ? "" : String.valueOf(user.get("SELF_INTR")).trim();
		boolean validPassword = socialJoin
				? password.matches("(NAVER|KAKAO|GOOGLE):.+")
				: password.matches("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,14}$");
		if (!email.matches("^[^@\\s]{1,64}@[^@\\s]{1,189}$") || !validPassword
				|| name.isEmpty() || name.length() > 50 || nickname.isEmpty() || nickname.length() > 10
				|| !residentPrefix.matches("[0-9]{7}") || !(phone.length() == 10 || phone.length() == 11)
				|| intro.length() > 100) {
			return false;
		}
		user.put("USER_IDXX", email);
		user.put("USER_NAME", name);
		user.put("USER_NICK", nickname);
		user.put("REGI_NUMB", residentPrefix);
		user.put("CELL_NUMB", phone);
		user.put("SELF_INTR", intro);
		return true;
	}

}
