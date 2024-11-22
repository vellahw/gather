package com.our.gather.moimMainPage.dao;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.oracleFunction.OracleFunction;
import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("MainDao")
public class moimMainDao extends AbstractDao {

    // 메인화면
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> mainPageMoim(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        List<Map<String, Object>> mainPageMoim = (List<Map<String, Object>>) selectList("moim.mainPageMoim", map);

        for (int i = 0; i < mainPageMoim.size(); i++) {
            Map<String, Object> hash = new HashMap<>();
            hash.put("HASH_IDXX", mainPageMoim.get(i).get("MOIM_IDXX"));

            List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

            List<Object> hashTag = new ArrayList<>();

            if (!HashTag.isEmpty()) {

                for (Map<String, Object> tag : HashTag) {

                    hashTag.add(tag.get("HASH_TAGG"));

                }

                mainPageMoim.get(i).put("HASH_TAGG", hashTag);
            }

            if (session.getAttribute("USER_NUMB") != null) {

                String userId = mainPageMoim.get(i).get("USER_NUMB").toString();

                String me = session.getAttribute("USER_NUMB").toString();

                String folwCode = OracleFunction.getRelationCode(me, userId);

                String folwBtn = OracleFunction.getCodeName("FOLW_CODE", folwCode);

                mainPageMoim.get(i).put("FOLW_CODE", folwCode);

                mainPageMoim.get(i).put("FOLW_BTNN", folwBtn);

            }

        }

        return mainPageMoim;
    }

}