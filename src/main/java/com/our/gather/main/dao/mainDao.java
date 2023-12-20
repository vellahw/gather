package com.our.gather.main.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;



@Repository("mainDao")
public class mainDao extends AbstractDao {
	 // 메인에서 보이는 모임, 리뷰, 자유게시판 리스트(4개씩)
	   @SuppressWarnings("unchecked")
	   public List<Map<String, Object>> menuList(Map<String, Object> map, CommandMap commandMap, HttpSession session) throws Exception {

	       List<Map<String, Object>> moimList = (List<Map<String, Object>>) selectList("mainPage.menu_List", map);

         return moimList;
    }
}