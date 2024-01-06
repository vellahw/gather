package com.our.gather.main.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
			mv.addObject("mainGather", mainService.mainGather(commandMap.getMap(), session, commandMap)); //게더 메인
      
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

}