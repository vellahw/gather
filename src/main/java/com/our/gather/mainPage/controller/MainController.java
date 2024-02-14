package com.our.gather.mainPage.controller;

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
import com.our.gather.common.common.Pager;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import com.our.gather.mainPage.service.MainService;
import com.our.gather.moimGather.service.GatherService;
import com.our.gather.notify.service.NotifyService;

@Controller
public class MainController {

	@Resource(name = "CommonService")
	private CommonService commonService;
	
	@Resource(name = "MainService") 
	private MainService mainService;
	 
	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	@RequestMapping(value = "/gather.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
							 @RequestParam(value = "cate", required = false) String CATE_IDXX,
							 @RequestParam(value = "keyword", required = false) String KEYY_WORD,
							 HttpSession session, CommandMap commandMap, Model model, Pager pager) throws Exception {

		ModelAndView mv1 = new ModelAndView("/mainPage/mainPage");
		mv1.setViewName("mainPage");

		ModelAndView mv2 = new ModelAndView("/listPage/listPage");
		mv2.setViewName("listPage");
		

		List<Map<String, Object>> pCate = commonService.pCate(commandMap.getMap(), commandMap);
		List<Map<String, Object>> cCate = commonService.cCate(commandMap.getMap(), commandMap);
		mv1.addObject("pCate", pCate);
		mv1.addObject("cCate", cCate);
		mv2.addObject("pCate", pCate);
		mv2.addObject("cCate", cCate);
		mv2.addObject("KEYY_WORD", KEYY_WORD);
		
		mv2.addObject("pager", pager);
		
		if(session.getAttribute("USER_NUMB") != null) {
			
			List<Map<String, Object>> notify = notifyService.getNotify(commandMap.getMap(), commandMap, session);
			
			mv1.addObject("notify", notify);
			mv2.addObject("notify", notify);
			mv1.addObject("notiCount", notify.size());
			mv2.addObject("notiCount", notify.size());
			
		}
		
		if(LIST_TYPE != null) {
			
			String moimType =  OracleFunction.getCodeName("MOIM_TYPE",LIST_TYPE.toUpperCase());
			
			mv1.addObject("moimType", moimType);
			mv2.addObject("moimType", moimType);
		}

		if (LIST_TYPE == null) {
			
			mv1.addObject("moimType", "게더"); //모임타입
			mv2.addObject("moimType", "게더");

			if (CATE_IDXX == null && KEYY_WORD == null) {

				mv1.addObject("main", gatherService.mainGather(commandMap.getMap(), session, commandMap)); // 게더 메인

			} else if(CATE_IDXX != null && KEYY_WORD == null) {

				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //게더 카테고리검색 리스트
				
				return mv2;

			} else if(CATE_IDXX == null && KEYY_WORD != null) {
				
				commandMap.put("KEYY_WORD", KEYY_WORD);
				mv2.addObject("list",  gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //게더 키워드 검색 리스트
				
				return mv2;
				
			}
			
		}
		
		if (LIST_TYPE != null && LIST_TYPE.equals("cb")) {

			if (CATE_IDXX == null && KEYY_WORD == null) {

				mv1.addObject("main", gatherService.mainGather(commandMap.getMap(), session, commandMap)); //추후 클럽으로 변경

			} else if(CATE_IDXX != null && KEYY_WORD == null) {

				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //추후 클럽으로 변경
				
				return mv2;

		     } else if (CATE_IDXX == null && KEYY_WORD != null) {
				
				commandMap.put("KEYY_WORD", KEYY_WORD);
				mv2.addObject("list", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //추후 클럽으로 변경
				
				return mv2;
				
			}
			
		}
		
		if (LIST_TYPE != null && LIST_TYPE.equals("ch")) {

			if (CATE_IDXX == null && KEYY_WORD == null) {

				mv1.addObject("main", gatherService.mainGather(commandMap.getMap(), session, commandMap)); //추후 챌린지로 변경

			} else if(CATE_IDXX != null && KEYY_WORD == null) {

				commandMap.put("CATE_IDXX", CATE_IDXX);

				if (CATE_IDXX.equals("all")) {

					mv2.addObject("CATE_NAME", "전체");

				} else {

					String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
					mv2.addObject("CATE_NAME", result);

				}

				mv2.addObject("list", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //추후 챌린지로 변경
				
				return mv2;

			} else if (CATE_IDXX == null && KEYY_WORD != null) {
				
				commandMap.put("KEYY_WORD", KEYY_WORD);
				mv2.addObject("list", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager)); //추후 챌린지로 변경
				
				return mv2;
				
			}
			
		}
		
		

		return mv1;
	}
	
	//날씨에 따른 모임(챌린지, 클럽에 출력 유뮤 추후 결정)
	@RequestMapping(value = "/getWeatherMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getWeatherMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
			HttpSession session, Pager pager) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String weatherType = requestBody.get("weatherType");
		String moimType = requestBody.get("moimType");

		List<String> dataList = new ArrayList<>();

		switch (weatherType) {

		case "sunny":

			// dataList = List.of("B01", "B04", "B06", "B17", "B20", "B22", "F07", "F04", "F06");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "cloudy":

			// dataList = List.of("C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "rainy":

			// dataList = List.of("A01", "A02", "A07", "A09", "B05", "B10", "B16", "D02", "D03", "D04", "D05", "D06", "D11", "D12", "D13", "D14", "D15", "D16");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "thunder":

			// dataList = List.of("D10", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "I01", "I02", "I03", "I04", "I05", "J01", "J02", "J03", "J04");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;

		case "snowy":

			dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
			commandMap.put("WEATH_CATE", dataList); //commandMap.put("WEATH_CATE", "B03");

			break;

		case "hot":

			dataList = List.of("A01", "A02", "A03", "A04", "A05"); // "test끝나면 지우기"
			commandMap.put("WEATH_CATE", dataList); //commandMap.put("WEATH_CATE", "B14");
			
		case "cold":
			
			// dataList = List.of("A01", "A02", "A07", "A09", "B05", "B10", "B16", "D02" "D03", "D04", "D05", "D06", "D11", "D12", "D13", "D14", "D15", "D16");
			dataList = List.of("A01", "A02", "A03", "A04", "A05");
			commandMap.put("WEATH_CATE", dataList);

			break;
		}

		if (moimType.equals("gt")) {

			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		} else if (moimType.equals("cb")) {
			
			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		} else if (moimType.equals("ch")) {
			
			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		}

		return mv;
	}
	
	//비로그인 사용자 근처의 모임(챌린지, 클럽에 출력 유뮤 추후 결정)
	@RequestMapping(value = "/getCurrentRegionMoim.com", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getCurrentRegionMoim(@RequestBody Map<String, String> requestBody, CommandMap commandMap,
			HttpSession session, Pager pager) throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");

		String cityCode = requestBody.get("cityCode");
		String moimType = requestBody.get("moimType");

		commandMap.put("CITY_CODE", cityCode);

		if (moimType.equals("gt")) {

			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		} else if (moimType.equals("cb")) {
			
			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		} else if (moimType.equals("ch")) {
			
			mv.addObject("data", gatherService.getGatherList(commandMap.getMap(), session, commandMap, pager));

		}

		return mv;
	}

}