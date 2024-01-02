package com.our.gather.common.contorller;

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

@Controller
public class CommonController {
	
	 @Resource(name="CommonService")
	 private CommonService commonService;
	 
	 @RequestMapping(value = "/cateGory.get")
		public ModelAndView getCate(@RequestParam(value = "type", required = false) String LIST_TYPE,
				@RequestParam(value = "cate", required = false) String CATE_IDXX, HttpSession session,
				CommandMap commandMap, Model model) throws Exception {

			ModelAndView mv = new ModelAndView("/components/category");
			mv.setViewName("category");
			
			List<Map<String, Object>> pCate = commonService.pCate(commandMap.getMap(), commandMap);
			List<Map<String, Object>> cCate = commonService.pCate(commandMap.getMap(), commandMap);
			mv.addObject("pCate", pCate); // 카테고리바
			mv.addObject("cCate", cCate); // 카테고리바
			
			return mv;
		}

	 
}
