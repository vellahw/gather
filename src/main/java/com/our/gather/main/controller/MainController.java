package com.our.gather.main.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.main.service.MainService;

@Controller
public class MainController {

	@Resource(name = "MainService")
	private MainService mainService;

	@Resource(name = "CommonService")
	private CommonService commonService;

	@RequestMapping(value = "/gather.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
			@RequestParam(value = "cate", required = false) String CATE_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/mainPage/mainPage");
		mv.setViewName("mainPage");

		List<Map<String, Object>> pCate = commonService.pCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> cCate = commonService.cCate(commandMap.getMap(), commandMap);
		mv.addObject("pCate", pCate);
		mv.addObject("cCate", cCate);

		if (session.getAttribute("USER_NUMB") != null) {

			mv.addObject("sUSER_NUMB", session.getAttribute("USER_NUMB"));
			mv.addObject("sUSER_IMAG", session.getAttribute("USER_IMAG"));
			mv.addObject("sUSER_NICK", session.getAttribute("USER_NICK"));
		}

		if (LIST_TYPE == null && CATE_IDXX == null) {

			mv.addObject("moimType", "게더"); // 모임타입
			mv.addObject("main", mainService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

		} else if (LIST_TYPE == null && CATE_IDXX != null) {
			ModelAndView mv2 = new ModelAndView("/listPage/list");
			mv2.setViewName("list");
			mv2.addObject("list", mainService.getGather(commandMap.getMap(), session, commandMap)); // 게더

			return mv2;

		}

		if (LIST_TYPE == "CB") {

			ModelAndView cbmv = new ModelAndView("redirect:/gather.com/club");
			return cbmv;

		}

		if (LIST_TYPE == "CH") {

			ModelAndView chmv = new ModelAndView("redirect:/gather.com/challenge");
			return chmv;

		}

		return mv;
	}

	@RequestMapping(value = "/getWeatherMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getWeatherMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap, HttpSession session)
			throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView"); // 결과 페이지의 뷰 이름
		
		String weatherType = requestBody.get("weatherType");
		String moimType = requestBody.get("moimType");
		System.out.println("moimType" + moimType);
		
		List<String> dataList = new ArrayList<>();

		System.out.println("날씨 상태: " + weatherType);

		switch (weatherType) {
		
		    case "sunny":
		    	
		        System.out.println("sunny 케이스 진입");
		        // dataList = List.of("B01", "B04", "B06", "B17", "B20", "B22", "F07", "F04", "F06");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05");
		        commandMap.put("WEATH_CATE", dataList);
		        
		        break;
	
		    case "cloudy":
		    	
		        System.out.println("cloudy 케이스 진입");
		        // dataList = List.of("C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05");
		        System.out.println("데이타리스트    :" + dataList);
		        commandMap.put("WEATH_CATE", dataList);
		        
		        break;
	
		    case "rainy":
		    	
		        System.out.println("rainy 케이스 진입");
		        // dataList = List.of("A01", "A02", "A07", "A09", "B05", "B10", "B16", "D02", "D03", "D04", "D05", "D06", "D11", "D12", "D13", "D14", "D15", "D16");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05");
		        commandMap.put("WEATH_CATE", dataList);
		        
		        break;
	
		    case "thunder":
		    	
		        System.out.println("thunder 케이스 진입");
		        // dataList = List.of("D10", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "I01", "I02", "I03", "I04", "I05", "J01", "J02", "J03", "J04");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05");
		        commandMap.put("WEATH_CATE", dataList);
		        
		        break;
	
		    case "snowy":
		    	
		        System.out.println("snowy 케이스 진입");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
		        commandMap.put("WEATH_CATE", dataList); // "B03"
		        
		        break;
	
		    case "hot":
		    	
		        System.out.println("hot 케이스 진입");
		        dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
		        commandMap.put("WEATH_CATE", dataList); // B14
		        
		        break;
		}
		
		if(moimType == null) {
			
			mv.addObject("data", mainService.getGather(commandMap.getMap(), session, commandMap));
		
		} else if(moimType == "cb"){
			
			
		} else if(moimType == "ch"){
			
			
		}

		return mv;
	}

}