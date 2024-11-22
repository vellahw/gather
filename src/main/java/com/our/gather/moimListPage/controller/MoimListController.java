package com.our.gather.moimListPage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.gather.common.common.CommandMap;
import com.our.gather.common.common.Criteria;
import com.our.gather.common.common.Pager;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import com.our.gather.moimDetailPage.service.MoimDetailService;
import com.our.gather.moimGather.service.GatherService;
import com.our.gather.moimListPage.service.MoimListService;
import com.our.gather.notify.service.NotifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

		ModelAndView mv = new ModelAndView("/listPage/listPage");
		mv.setViewName("listPage");

		commandMap.put("amount", cri.getAmount());
		commandMap.put("pageNum", cri.getPageNum());
		String moimType = null;

		if (LIST_TYPE != null) {
			moimType = OracleFunction.getCodeName("MOIM_TYPE", LIST_TYPE.toUpperCase());
			mv.addObject("moimCode", LIST_TYPE);
			commandMap.put("MOIM_TYPE", LIST_TYPE.toUpperCase());
		} else {
			moimType = OracleFunction.getCodeName("MOIM_TYPE", "GT");
			mv.addObject("moimCode", "GT");
			commandMap.put("MOIM_TYPE", "GT");
		}

		mv.addObject("moimType", moimType);

		if (CATE_IDXX != null && KEYY_WORD == null) {
			commandMap.put("CATE_IDXX", CATE_IDXX);
			int total = moimListService.getMoimCount(commandMap.getMap(), commandMap);

			String result = OracleFunction.getCodeName("CATE_IDXX", CATE_IDXX);
			mv.addObject("CATE_NAME", result);
			mv.addObject("pageMaker", new Pager(cri, total));

			return mv;
		} else if (CATE_IDXX == null && KEYY_WORD != null) {
			commandMap.put("KEYY_WORD", KEYY_WORD);
			int total = moimListService.getMoimCount(commandMap.getMap(), commandMap);

			mv.addObject("list", moimListService.getMoimList(commandMap.getMap(), session, commandMap)); // 추후 챌린지로 변경
			mv.addObject("pageMaker", new Pager(cri, total));

			return mv;
		}

		return mv;
	}
}