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

import com.our.gather.common.OracleFunction.OracleFunction;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.gather.service.GatherService;
import com.our.gather.main.service.MainService;

@Controller
public class MainController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@Resource(name = "MainService")
	private MainService mainService;

	@Resource(name = "GatherService")
	private GatherService gatherService;

	@RequestMapping(value = "/gather.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
			@RequestParam(value = "cate", required = false) String CATE_IDXX, HttpSession session,
			CommandMap commandMap, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("/mainPage/mainPage");
		mv.setViewName("mainPage");

		ModelAndView mv2 = new ModelAndView("/listPage/listPage");
		mv2.setViewName("listPage");

		List<Map<String, Object>> pCate = commonService.pCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> cCate = commonService.cCate(commandMap.getMap(), commandMap);
		mv.addObject("pCate", pCate);
		mv.addObject("cCate", cCate);
		mv2.addObject("pCate", pCate);
		mv2.addObject("cCate", cCate);
		

		if (LIST_TYPE == null) {

			if (CATE_IDXX == null) {

				mv.addObject("moimType", "게더"); // 모임타입
				mv.addObject("main", mainService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

			} else {

				mv2.addObject("moimType", "게더");
				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGather(commandMap.getMap(), session, commandMap)); // 게더
				return mv2;

			}
		}
		
		if (LIST_TYPE == null) {

			if (CATE_IDXX == null) {

				mv.addObject("moimType", "게더"); // 모임타입
				mv.addObject("main", mainService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

			} else {

				mv2.addObject("moimType", "게더");
				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGather(commandMap.getMap(), session, commandMap)); // 게더
				return mv2;

			}
		}
		
		if (LIST_TYPE != null && LIST_TYPE.equals("cb")) {

			if (CATE_IDXX == null) {

				mv.addObject("moimType", "클럽"); // 모임타입
				mv.addObject("main", mainService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

			} else {

				mv2.addObject("moimType", "클럽");
				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGather(commandMap.getMap(), session, commandMap)); // 게더
				return mv2;

			}
		}
		
		if (LIST_TYPE != null && LIST_TYPE.equals("ch")) {

			if (CATE_IDXX == null) {

				mv.addObject("moimType", "챌린지"); // 모임타입
				mv.addObject("main", mainService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

			} else {

				mv2.addObject("moimType", "챌린지");
				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGather(commandMap.getMap(), session, commandMap)); // 게더
				return mv2;

			}
		}

		return mv;
	}

	@RequestMapping(value = "/getWeatherMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getWeatherMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
			HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String weatherType = requestBody.get("weatherType");
		String moimType = requestBody.get("moimType");

		List<String> dataList = new ArrayList<>();

		switch (weatherType) {

		case "sunny":

			// dataList = List.of("B01", "B04", "B06", "B17", "B20", "B22", "F07", "F04",
			// "F06");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "cloudy":

			// dataList = List.of("C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08",
			// "C09", "C10", "C11", "C12");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "rainy":

			// dataList = List.of("A01", "A02", "A07", "A09", "B05", "B10", "B16", "D02",
			// "D03", "D04", "D05", "D06", "D11", "D12", "D13", "D14", "D15", "D16");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "thunder":

			// dataList = List.of("D10", "G01", "G02", "G03", "G04", "G05", "G06", "G07",
			// "I01", "I02", "I03", "I04", "I05", "J01", "J02", "J03", "J04");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "snowy":

			dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
			commandMap.put("WEATH_CATE", dataList); // "B03"

			break;

		case "hot":

			dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
			commandMap.put("WEATH_CATE", dataList); // B14

			break;
		}

		if (moimType.equals("gt")) {

			mv.addObject("data", gatherService.getGather(commandMap.getMap(), session, commandMap));

		} else if (moimType.equals("cb")) {

		} else if (moimType.equals("ch")) {

		}

		return mv;
	}

	@RequestMapping(value = "/getCurrentRegionMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getCurrentRegionMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
			HttpSession session) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String cityCode = requestBody.get("cityCode");
		String moimType = requestBody.get("moimType");

		commandMap.put("CITY_CODE", cityCode);

		if (moimType.equals("gt")) {

			mv.addObject("data", gatherService.getGather(commandMap.getMap(), session, commandMap));

		} else if (moimType.equals("cb")) {

		} else if (moimType.equals("ch")) {

		}

		return mv;
	}

}