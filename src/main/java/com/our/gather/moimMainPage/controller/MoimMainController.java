package com.our.gather.moimMainPage.controller;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Criteria;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimMainPage.service.MoimMainService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class MoimMainController {

	@Resource(name = "MoimMainService")
	private MoimMainService moimMainService;

	@Resource(name = "CommonService")
	private CommonService commonService;

	@RequestMapping(value = "/gather.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
							 HttpSession session, CommandMap commandMap, Criteria cri,
							 HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("/moim/moimMainPage");
		mv.setViewName("moimMainPage");


		commandMap.put("amount", cri.getAmount());
		commandMap.put("pageNum", cri.getPageNum());
		String moimType = null;

		if(LIST_TYPE != null) {

			moimType = OracleFunction.getCodeName("MOIM_TYPE", LIST_TYPE.toUpperCase());
			mv.addObject("moimCode", LIST_TYPE);
			commandMap.put("MOIM_TYPE", LIST_TYPE.toUpperCase());

		}else{

			moimType = OracleFunction.getCodeName("MOIM_TYPE", "GT");
			mv.addObject("moimCode", "GT");
			commandMap.put("MOIM_TYPE", "GT");

		}
		mv.addObject("moimType", moimType);

		String[] viewTypes;

		if (session.getAttribute("USER_NUMB") != null) {
			viewTypes = new String[] {"taste", "hot", "region", "like"};
		} else {
			viewTypes = new String[] {"hot", "like"};
		}

		for (String viewType : viewTypes) {
			commandMap.put("VIEW_TYPE", viewType);
			System.out.println(":::::::::::::::::" + viewType + "List:::::::::::::::::::::::");

			List<Map<String, Object>> list = moimMainService.mainPageMoim(commandMap.getMap(), session, commandMap);

			if (list != null && !list.isEmpty()) {
				System.out.println(viewType + "list :::" + list.get(0));
				mv.addObject(viewType + "List", list);
			} else {
				System.out.println(viewType + "list is empty or null");
			}
		}

		return mv;
	}

	//날씨에 따른 모임(챌린지, 클럽에 출력 유뮤 추후 결정)
	@RequestMapping(value = "/getWeatherMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getWeatherMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
									   HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		/*ModelAndView mv = new ModelAndView("/mainPage/mainPage");
		mv.setViewName("mainPage");*/


		String weatherType = requestBody.get("weatherType");
		String moimType = requestBody.get("moimType");

		List<String> dataList = new ArrayList<>();

		switch (weatherType) {

			case "sunny":

				dataList = List.of("B01", "B04", "B06", "B17", "B20", "B22", "F07", "F04", "F06");
				commandMap.put("WEATH_CATE", dataList);

				break;

			case "cloudy":

				dataList = List.of("C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12");
				commandMap.put("WEATH_CATE", dataList);

				break;

			case "rainy":
			case "cold":

				dataList = List.of("A01", "A02", "A07", "A09", "B05", "B10", "B16", "D02", "D03", "D04", "D05", "D06", "D11", "D12", "D13", "D14", "D15", "D16");
				commandMap.put("WEATH_CATE", dataList);

				break;

			case "thunder":

				dataList = List.of("D10", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "I01", "I02", "I03", "I04", "I05", "J01", "J02", "J03", "J04");
				commandMap.put("WEATH_CATE", dataList);

				break;

			case "snowy":

				dataList = List.of("B03");
				commandMap.put("WEATH_CATE", dataList);

				break;

			case "hot":

				dataList = List.of("B14");
				commandMap.put("WEATH_CATE", dataList);

				break;

		}

		commandMap.put("MOIM_TYPE", moimType.toUpperCase());

		mv.addObject("data", moimMainService.mainPageMoim(commandMap.getMap(), session, commandMap));


		return mv;
	}

	//비로그인 사용자 근처의 모임(챌린지, 클럽에 출력 유무 추후 결정)
	@RequestMapping(value = "/getCurrentRegionMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getCurrentRegionMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
											 HttpSession session) throws Exception {


		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String city = requestBody.get("city");
		System.out.println("city::::::::::::::::::::::::::::::" + city);
		String moimType = requestBody.get("moimType");

		commandMap.put("CITY_CODE", commonService.extractRegiCode(city));
		commandMap.put("MOIM_TYPE", moimType.toUpperCase());

		mv.addObject("data", moimMainService.mainPageMoim(commandMap.getMap(), session, commandMap));



		return mv;
	}

}