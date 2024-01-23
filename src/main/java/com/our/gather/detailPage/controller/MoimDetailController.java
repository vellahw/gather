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

			mv.addObject("detail", gatherService.getGatherDetail(commandMap.getMap(), session, commandMap)); // 게더
			mv.addObject("member", gatherService.getGatherMember(commandMap.getMap(), commandMap)); // 게더맴버
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
	public Map<Object, String> moimJoin(@RequestBody Map<String, String> requestBody, HttpSession session, 
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		System.out.println("돌긴 도는가?" + requestBody);
		
		String MOIM_IDXX = requestBody.get("MOIM_IDXX");
		String WAIT_YSNO = requestBody.get("WAIT_YSNO");

		Map<Object, String> resultMap = new HashMap<>();

		try {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
			commandMap.put("MOIM_IDXX", MOIM_IDXX);
			commandMap.put("WAIT_YSNO", WAIT_YSNO);

			moimDetailService.moimJoin(commandMap.getMap(), commandMap);

			resultMap.put("result", "success");
			resultMap.put("message", "모임 참여에 성공하였습니다.");

		} catch (Exception e) {

			resultMap.put("result", "fail");
			resultMap.put("message", "모임 참여에 실패하였습니다. 오류 메시지: " + e.getMessage());
			System.out.println("error : " + e.getMessage());

		}

		return resultMap;
	}

	// 모임참여 상태변경
	@RequestMapping("/moimStateUpdate.com")
	@ResponseBody
	public Map<Object, String> moimStateUpdate(
			@RequestParam(value = "USER_IDXX", required = false) String USER_IDXX,
			@RequestParam(value = "MOIM_IDXX", required = false) String MOIM_IDXX,
			@RequestParam(value = "WAIT_YSNO", required = false) String WAIT_YSNO,
			@RequestParam(value = "BANN_YSNO", required = false) String BANN_YSNO,
			HttpSession session, HttpServletRequest request, CommandMap commandMap) throws Exception {

		Map<Object, String> resultMap = new HashMap<>();

		try {
			
			if(USER_IDXX == null) {
				
				commandMap.put("USER_IDXX", session.getAttribute("USER_NUMB"));
				
			} else {
				
				commandMap.put("USER_IDXX", USER_IDXX);
			}
			
			commandMap.put("MOIM_IDXX", MOIM_IDXX);

			if (WAIT_YSNO != null) {

				commandMap.put("WAIT_YSNO", WAIT_YSNO);

			} else {

				commandMap.put("WAIT_YSNO", "N");

			}

			if (WAIT_YSNO != null) {

				commandMap.put("BANN_YSNO", BANN_YSNO);

			} else {

				commandMap.put("BANN_YSNO", "N");

			}

			moimDetailService.moimStateUpdate(commandMap.getMap(), commandMap);

			resultMap.put("result", "success");
			resultMap.put("message", "상태변경 완료.");

		} catch (Exception e) {

			resultMap.put("result", "fail");
			resultMap.put("message", "상태변경 실패.\n 오류 메시지: " + e.getMessage());
			System.out.println("error : " + e.getMessage());

		}

		return resultMap;
	}

}
