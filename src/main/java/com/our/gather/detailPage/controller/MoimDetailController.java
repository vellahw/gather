package com.our.gather.detailPage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.detailPage.service.MoimDetailService;
import com.our.gather.moimGather.service.GatherService;

@Controller
public class MoimDetailController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "MoimDetailService")
	private MoimDetailService moimDetailService;

	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	//모임 상세보기
	@RequestMapping(value = "/gatherDetail.com")
	public ModelAndView main(@RequestParam(value = "idx", required = false) String MOIM_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/detailPage/detailPage");
		mv.setViewName("detailPage");

		commandMap.put("MOIM_IDXX", MOIM_IDXX);

		String moimType = MOIM_IDXX.substring(0, 2);

		if (moimType.equals("GT")) {


			mv.addObject("member", gatherService.getGatherMember(commandMap.getMap(), commandMap)); // 게더맴버
			mv.addObject("detail", gatherService.getGatherDetail(commandMap.getMap(), session, commandMap)); // 게더
			mv.addObject("img", gatherService.getGatherImg(commandMap.getMap(), commandMap)); // 게더 이미지

			if (session.getAttribute("USER_NUMB") != null) {

				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				
				// 로그인시 로그인 회원의 해당 게더 참여상태
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
	public ModelAndView moimJoin(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		String MOIM_IDXX = requestBody.get("MOIM_IDXX");
		String WAIT_YSNO = requestBody.get("WAIT_YSNO");

		try {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			commandMap.put("MOIM_IDXX", MOIM_IDXX);
			commandMap.put("WAIT_YSNO", WAIT_YSNO);

			moimDetailService.moimJoin(commandMap.getMap(), commandMap);

			mv.addObject("result", "success");

		} catch (Exception e) {

			mv.addObject("result", "fail");
			System.out.println("error : " + e.getMessage());

		}

		return mv;
	}

	// 모임참여 상태변경
	@RequestMapping("/moimStateUpdate.com")
	@ResponseBody
	public ModelAndView moimStateUpdate(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		ModelAndView mv = new ModelAndView("jsonView");
		
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
				
			moimDetailService.moimJoin(commandMap.getMap(), commandMap);

			mv.addObject("result", "success");

		} catch (Exception e) {

			mv.addObject("result", "fail");
			System.out.println("error : " + e.getMessage());

		}

		return mv;
	}

}
