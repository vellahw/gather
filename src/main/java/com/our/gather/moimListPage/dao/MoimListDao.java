package com.our.gather.moimListPage.dao;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("MoimListDao")
public class MoimListDao extends AbstractDao {

    @Resource(name = "CommonService")
    private CommonService commonService;

    // 게더추출
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMoimList(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        List<Map<String, Object>> getMoimList = (List<Map<String, Object>>) selectList("moim.getMoim", map);

        for (int i = 0; i < getMoimList.size(); i++) {
            Map<String, Object> hash = new HashMap<>();
            hash.put("HASH_IDXX", getMoimList.get(i).get("MOIM_IDXX"));

            List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

            List<Object> hashTag = new ArrayList<>();

            if (!HashTag.isEmpty()) {

                for (Map<String, Object> tag : HashTag) {

                    hashTag.add(tag.get("HASH_TAGG"));

                }

                getMoimList.get(i).put("HASH_TAGG", hashTag);
            }

            if (session.getAttribute("USER_NUMB") != null) {

                commonService.makeFollowBtn(getMoimList, session);

            }

        }

        return getMoimList;
    }


    //모임 총 갯수
    public int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception {
        return Integer.parseInt(selectOne("moim.getMoimCount", map).toString());
    }


}