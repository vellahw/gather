package com.our.gather.common.common;

import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pager {
	
	 private int startPage; //시작페이지
	   private int endPage; //끝페이지
	   private boolean prev, next; //이전,다음
	   private int total; //총 데이터 개수
	   private Criteria cri; // Criteria 선언
	   private String sort; //정렬
	   private List<Map<String, Object>> contents;
	   
	   public Pager(Criteria cri, int total, List<Map<String, Object>> contents) { //pageMaker
	      this.cri = cri;
	      this.total = total; //전체 페이지 
	      this.contents = contents; //데이터(리스트)
	      this.endPage = (int)(Math.ceil(cri.getPageNum() / 5.0)) * 5; //페이지 끝 번호
	      this.startPage = this.endPage -4; //페이지 시작 번호
	      int realEnd = (int)(Math.ceil((total * 1.0) / cri.getAmount())); //진짜 끝 페이지
	      if(realEnd < this.endPage) {
	         this.endPage = realEnd; //끝페이지가 진짜끝페이지보다 크다면, 끝페이지는 진짜끝페이지가 되야함
	      }
	      
	      this.prev = this.startPage > 1; //이전
	      this.next = this.endPage < realEnd; //다음
	   }
	
}