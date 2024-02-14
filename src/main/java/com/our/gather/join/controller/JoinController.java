package com.our.gather.join.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.join.service.JoinService;

@Controller
public class JoinController {

    @Resource(name = "JoinService")
    private JoinService joinService;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private HttpServletRequest request;

    // 아이디 중복 검사
	  @RequestMapping(value = "/gather/checkidDo.com")
	  @ResponseBody // 자바객체를 다시 HTTP 응답 바디로 변환
	  public ResponseEntity<String> checkId(@RequestBody Map<String, Object> param) throws Exception {
		
		  Map<String, Object> result = joinService.checkId(param);
		
		  ObjectMapper objectMapper = new ObjectMapper();
		  // 데이터를 JSON 문자열로 변환
		  String json = objectMapper.writeValueAsString(result);
		
		   return ResponseEntity.ok()
			     .contentType(MediaType.APPLICATION_JSON)
			      .body(json);
	  }

    // 닉네임 중복 검사
    @ResponseBody
    @RequestMapping("/gather/checknickDo.com")
    public ResponseEntity<String> checkNickname(@RequestBody Map<String, Object> param) throws Exception {
        
        Map<String, Object> result = joinService.checkNick(param);
        
        ObjectMapper objectMapper = new ObjectMapper();
        // 데이터를 JSON 문자열로 변환
        String json = objectMapper.writeValueAsString(result);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    @RequestMapping(value = "/gather/joinDo.com", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> userJoin(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, CommandMap commandMap) throws Exception {

        try {
            
            Map<String, Object> param = (Map<String, Object>) requestBody.get("data");
            List<Map<String, String>> jsonArray = (List<Map<String, String>>) requestBody.get("regi");

            joinService.userJoin(param, commandMap, request);
            
            String userNumb = (String) commandMap.get("USER_NUMB");

            if (jsonArray != null) {
                
                for (Map<String, String> item : jsonArray) {
                    
                    commandMap.put("USER_NUMB", userNumb);
                    commandMap.put("REGI_CODE", item.get("REGI_CODE"));

                    joinService.insertRegi(commandMap.getMap(), commandMap);
                }
            }

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            System.out.println("error : " + e.getMessage());
            return ResponseEntity.ok("fail");
        }
    }
    
    public ResponseEntity<String> fileTest(@RequestBody Map<String, Object> requestBody) {
    		try {
            

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            System.out.println("error : " + e.getMessage());
            return ResponseEntity.ok("fail");
        }
    }
    
    @ResponseBody
    @RequestMapping(value = "/gather/mailCheck", method = RequestMethod.GET)
    public String emailAuth(String email) throws IOException {        
        Random random = new Random();
        int checkNum = random.nextInt(888888) + 111111;
        
        System.out.println("이메일 데이터 전송 확인");
        System.out.println("이메일 : " + email);
        System.out.println("인증번호 : " + checkNum);
      
        /* 이메일 보내기 */
        String setFrom = "vs8170@naver.com";
        String toMail = email;
        String title =  "'GATHER'인증 이메일 입니다.";
        String content = 
                  "<img src='data:image/png;base64," + getImageBase64() + "'/>" 
                + "<br><br>" 
                + "'GATHER'를 방문해주셔서 감사합니다." 
                + "<br><br>"
                + "인증 번호는 [ " + checkNum + " ] 입니다." 
                + "<br>" 
                + "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content,true);
            mailSender.send(message);
            
        }catch(Exception e) {
        	
            e.printStackTrace();
            String error = "fail"; 
            
            return error;
            
        }
        
        return Integer.toString(checkNum);
 
    }
    
    private String getImageBase64() throws IOException {
        String imagePath = "/resources/img/logo/logo.png"; // 상대 경로 사용
        String realPath = request.getServletContext().getRealPath(imagePath); // 실제 파일 경로 획득

        Path path = Paths.get(realPath);
        byte[] imageBytes = Files.readAllBytes(path);
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}