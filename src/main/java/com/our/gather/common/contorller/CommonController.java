package com.our.gather.common.contorller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;

@Controller
public class CommonController {

    @Resource(name = "CommonService")
    private CommonService commonService;

    @RequestMapping(value = "/cateGory.get", produces = "application/json")
    @ResponseBody
    public Map<String, List<Map<String, Object>>> getCate(HttpSession session, CommandMap commandMap, Model model)
            throws Exception {

        Map<String, List<Map<String, Object>>> resultMap = new HashMap<>();

        List<Map<String, Object>> pCate = commonService.pCate(commandMap.getMap(), commandMap);
        List<Map<String, Object>> cCate = commonService.pCate(commandMap.getMap(), commandMap);

        resultMap.put("pCate", pCate);
        resultMap.put("cCate", cCate);

        return resultMap;
    }
}