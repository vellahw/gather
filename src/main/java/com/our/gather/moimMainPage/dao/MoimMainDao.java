package com.our.gather.moimMainPage.dao;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import org.springframework.stereotype.Repository;

import com.our.gather.common.dao.AbstractDao;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("MoimMainDao")
public class MoimMainDao extends AbstractDao {
	@Resource(name = "CommonService")
	private CommonService commonService;

    // 메인화면
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> mainPageMoim(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        List<Map<String, Object>> mainPageMoim = (List<Map<String, Object>>) selectList("moim.mainPageMoim", map);

        enrichHashTags(mainPageMoim);
        if (session.getAttribute("USER_NUMB") != null) {
            commonService.makeFollowBtn(mainPageMoim, session);
        }

        return mainPageMoim;
    }

    @SuppressWarnings("unchecked")
    private void enrichHashTags(List<Map<String, Object>> moims) throws Exception {
        if (moims.isEmpty()) {
            return;
        }
        List<Object> ids = new ArrayList<>();
        Map<Object, List<Object>> tagsById = new HashMap<>();
        for (Map<String, Object> moim : moims) {
            Object id = moim.get("MOIM_IDXX");
            ids.add(id);
            tagsById.put(id, new ArrayList<>());
        }
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("IDS", ids);
        List<Map<String, Object>> tags = (List<Map<String, Object>>) selectList("common.hashTags", parameters);
        for (Map<String, Object> tag : tags) {
            List<Object> values = tagsById.get(tag.get("HASH_IDXX"));
            if (values != null) {
                values.add(tag.get("HASH_TAGG"));
            }
        }
        for (Map<String, Object> moim : moims) {
            moim.put("HASH_TAGG", tagsById.get(moim.get("MOIM_IDXX")));
        }
    }

}
