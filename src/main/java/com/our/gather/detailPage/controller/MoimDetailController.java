package com.our.gather.detailPage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.detailPage.service.MoimDetailService;
import com.our.gather.join.service.JoinService;
import com.our.gather.moimGather.service.GatherService;
import com.our.gather.notify.service.NotifyService;

@Controller
public class MoimDetailController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "MoimDetailService")
	private MoimDetailService moimDetailService;

	@Resource(name = "NotifyService")
	private NotifyService notifyService;
	
	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	@Resource(name = "JoinService")
	private JoinService joinService;
	
	
	//모임 상세보기
	@RequestMapping(value = "/gatherDetail.com")
	public ModelAndView main(@RequestParam(value = "idx", required = false) String MOIM_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/detailPage/detailPage");
		mv.setViewName("detailPage");

		commandMap.put("MOIM_IDXX", MOIM_IDXX);

		String moimType = MOIM_IDXX.substring(0, 2);

		if (moimType.equals("GT")) {

			List<Map<String, Object>> memList = gatherService.getGatherMember(commandMap.getMap(), commandMap, session);
			Map<String, Object> detailMap = gatherService.getGatherDetail(commandMap.getMap(), session, commandMap);
			
			mv.addObject("member", memList); // 게더맴버
			mv.addObject("detail", detailMap); // 게더
			mv.addObject("info", detailMap.remove("MOIM_CNTT"));
			mv.addObject("img", gatherService.getGatherImg(commandMap.getMap(), commandMap)); // 게더 이미지

			if (session.getAttribute("USER_NUMB") != null) {

				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				
				Map<String, Object> cateIn = new HashMap<>();

				cateIn.put("CATE_IDXX", detailMap.get("CATE_IDXX"));
				cateIn.put("USER_NUMB", session.getAttribute("USER_NUMB"));

				joinService.inertCate(cateIn, commandMap);
				
				// 로그인시 로그인 회원의 해당 게더 참여상태
				List<Map<String, Object>> notify = notifyService.getNotify(commandMap.getMap(), commandMap, session);
				
				mv.addObject("notify", notify);
				mv.addObject("notiCount", notify.size());
				
				Map<String, Object> result = gatherService.getGatherYourState(commandMap.getMap(), session, commandMap);
				
				if(result != null) {
					
					mv.addObject("yourState", result); 
					
				} else {
					
					mv.addObject("yourState", "null");
				}
			}
		}

		return mv;
	}
	
	// 모임참여
	@RequestMapping("/moimJoin.com")
	@ResponseBody
	public ResponseEntity<String> moimJoin(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		
		String MOIM_IDXX = requestBody.get("MOIM_IDXX");
		String WAIT_YSNO = requestBody.get("WAIT_YSNO");

		try {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			commandMap.put("MOIM_IDXX", MOIM_IDXX);
			commandMap.put("WAIT_YSNO", WAIT_YSNO);

			moimDetailService.moimJoin(commandMap.getMap(), commandMap);

			return ResponseEntity.ok("Success");

		} catch (Exception e) {

			System.out.println("error : " + e.getMessage());
			return ResponseEntity.ok("fail");

		}

	}

	// 모임참여 상태변경
	@RequestMapping("/moimStateUpdate.com")
	@ResponseBody
	public ResponseEntity<String> moimStateUpdate(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		String USER_NUMB = requestBody.get("USER_NUMB");
		String MOIM_IDXX = requestBody.get("MOIM_IDXX");
		String states = requestBody.get("states");

		
		try {
			
			commandMap.put("USER_NUMB", USER_NUMB);
			commandMap.put("MOIM_IDXX", MOIM_IDXX);
			
			if(states.equals("normal")) { 			//정상 참여자(대기여부:'N' 강퇴여부: 'N')
				
				commandMap.put("WAIT_YSNO", "N"); 	//대기여부
				commandMap.put("BANN_YSNO", "N"); 	//강퇴여부
				
			} else if(states.equals("wait")){ 		//대기자 (대기여부:'Y' 강퇴여부: 'N')
				
				commandMap.put("WAIT_YSNO", "Y");
				commandMap.put("BANN_YSNO", "N");
				
			} else if(states.equals("bann")) { 		//추방당한 회원 (대기여부:'N' 강퇴여부: 'Y')
				
				commandMap.put("WAIT_YSNO", "N");
				commandMap.put("BANN_YSNO", "Y");
			
			} else if(states.equals("exit")) { 		//탈퇴 회원 (대기여부:'Y' 강퇴여부: 'Y')
				
				commandMap.put("WAIT_YSNO", "Y"); 
				commandMap.put("BANN_YSNO", "Y"); 
				
			}
				
			moimDetailService.moimStateUpdate(commandMap.getMap(), commandMap);

			return ResponseEntity.ok("Success");

		} catch (Exception e) {

			return ResponseEntity.ok("fail");

		}

	}
		
	// 모임참여 상태변경
	@RequestMapping("/setGatherEnd.com")
	@ResponseBody
	public ResponseEntity<String> setGatherEnd(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		String MOIM_IDXX = requestBody.get("MOIM_IDXX");

		try {
			
			 Map<String, Object> paramMap = new HashMap<>();
			 
			 paramMap.put("GATH_IDXX", MOIM_IDXX);
			
			 gatherService.setGatherEnd(paramMap);

			return ResponseEntity.ok("Success");

		} catch (Exception e) {

			return ResponseEntity.ok("fail");

		}

	}

}
