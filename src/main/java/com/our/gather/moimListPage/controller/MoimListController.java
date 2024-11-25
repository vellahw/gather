package com.our.gather.moimListPage.controller;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Criteria;
import com.our.gather.common.common.Pager;
import com.our.gather.common.oracleFunction.OracleFunction;
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

	@RequestMapping(value = "/gatherList.com")
	public ModelAndView main(@RequestParam(value = "type", required = false) String LIST_TYPE,
							 @RequestParam(value = "cate", required = false) String CATE_IDXX,
							 @RequestParam(value = "keyword", required = false) String KEYY_WORD,
							 HttpSession session, CommandMap commandMap, Criteria cri,
							 HttpServletRequest request) throws Exception {

		ModelAndView mv = new ModelAndView("/moim/moimListPage");
		mv.setViewName("moimListPage");

		commandMap.put("amount", cri.getAmount());
		commandMap.put("pageNum", cri.getPageNum());
		String moimType = null;

		if (LIST_TYPE != null) {
			moimType = OracleFunction.getCodeName("MOIM_TYPE", LIST_TYPE.toUpperCase());
			mv.addObject("MOIM_TYPE", LIST_TYPE);
			commandMap.put("MOIM_TYPE", LIST_TYPE.toUpperCase());
		} else {
			moimType = OracleFunction.getCodeName("MOIM_TYPE", "GT");
			mv.addObject("MOIM_TYPE", "GT");
			commandMap.put("MOIM_TYPE", "GT");
		}

		mv.addObject("MOIM_TYPE", moimType);

		commandMap.put("CATE_IDXX", CATE_IDXX);
		commandMap.put("KEYY_WORD", KEYY_WORD);

		int total = moimListService.getMoimCount(commandMap.getMap(), commandMap);

		mv.addObject("list", moimListService.getMoimList(commandMap.getMap(), session, commandMap));
		String CATE_NAME = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
		mv.addObject("CATE_IDXX", CATE_IDXX);
		mv.addObject("CATE_NAME", CATE_NAME);
		mv.addObject("KEYY_WORD", KEYY_WORD);
		mv.addObject("pageMaker", new Pager(cri, total));

		return mv;

	}
}