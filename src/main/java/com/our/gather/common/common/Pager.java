package com.our.gather.common.common;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pager {

	private int pageCount; // 하단 출력 페이지 번호
	private int startPage; // 시작페이지
	private int endPage;   // 끝페이지
	private int realEnd;
	private boolean prev, next; // 이전,다음
	private int total;
	private Criteria cri; // Criteria 선언

	  public Pager (Criteria cri, int total) { 
		  
	      this.cri = cri;
	      this.total = total; //전체 페이지!
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