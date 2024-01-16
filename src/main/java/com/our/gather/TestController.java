package com.our.gather;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.our.gather.common.common.CommandMap;

@Controller
public class TestController {
	@RequestMapping(value = "/gather.com/detail", method = RequestMethod.GET)
	public ModelAndView loginForm(CommandMap commandMap) throws Exception {

		ModelAndView mv = new ModelAndView("/detailPage/detailPage");
		mv.setViewName("detailPage");

			return mv;
	}
}
