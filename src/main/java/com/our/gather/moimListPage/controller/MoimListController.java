package com.our.gather.moimListPage.controller;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Criteria;
import com.our.gather.common.common.Pager;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimListPage.service.MoimListService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MoimListController {

	@Resource(name = "MoimListService")
	private MoimListService moimListService;

	@Resource(name = "CommonService")
	private CommonService commonService;

	@RequestMapping(value = "/gatherList.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
							 @RequestParam(value = "cate", required = false) String CATE_IDXX,
							 @RequestParam(value = "keyword", required = false) String KEYY_WORD,
							 HttpSession session, CommandMap commandMap, Criteria cri,
							 HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("/moim/moimListPage");
		mv.setViewName("moimListPage");
		System.out.println("현재 사용 중인 Java 버전: " + System.getProperty("java.version"));

		commandMap.put("amount", cri.getAmount());
		commandMap.put("pageNum", cri.getPageNum());
		String moimTypeKr = null;

		if (LIST_TYPE != null) { //챌린지, 클럽
			moimTypeKr = OracleFunction.getCodeName("MOIM_TYPE", LIST_TYPE.toUpperCase()); //오라클 함수로 moimType 호출
			mv.addObject("MOIM_TYPE", LIST_TYPE);
			commandMap.put("MOIM_TYPE", LIST_TYPE.toUpperCase());
		} else { // 게더
			moimTypeKr = OracleFunction.getCodeName("MOIM_TYPE", "GT");
			mv.addObject("MOIM_TYPE", "GT");
			commandMap.put("MOIM_TYPE", "GT");
		}

		commandMap.put("CATE_IDXX", CATE_IDXX);
		commandMap.put("KEYY_WORD", KEYY_WORD);

		int total = moimListService.getMoimCount(commandMap.getMap(), commandMap); //모임 수
		String cateName = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);//카테고리 코드로 카테고리 명 호출

		if(CATE_IDXX != null && !CATE_IDXX.equals("all")) {
			String CateImg = commonService.getCodeOption("CATE_IDXX", CATE_IDXX.substring(0, 1), "1");//카테고리 이미지
			mv.addObject("CATE_IMGG", CateImg);
		}

		mv.addObject("MOIM_TYPE_KR", moimTypeKr);
		mv.addObject("list", moimListService.getMoimList(commandMap.getMap(), session, commandMap));
		mv.addObject("CATE_IDXX", CATE_IDXX);
		mv.addObject("CATE_NAME", cateName);
		mv.addObject("KEYY_WORD", KEYY_WORD);
		mv.addObject("pageMaker", new Pager(cri, total));

		return mv;

	}
}