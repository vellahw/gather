package com.our.gather.common.common;

public class Pager {

	private int startPage; // 시작페이지
	private int endPage;   // 끝페이지
	private boolean prev, next; // 이전,다음
	private Criteria cri; // Criteria 선언

	  public Pager (Criteria cri, int total) { 
		  
	      this.cri = cri;
	      this.endPage = (int)(Math.ceil(cri.getPageNum() / 5.0)) * 5; //페이지 끝 번호
	      this.startPage = this.endPage -4; //페이지 시작 번호
	      int realEnd = (int)(Math.ceil((total * 1.0) / cri.getAmount())); //진짜 끝 페이지
	      if(realEnd < this.endPage) {
	         this.endPage = realEnd; //끝페이지가 진짜끝페이지보다 크다면, 끝페이지는 진짜끝페이지가 되야함
	      }
	      
	      this.prev = this.startPage > 1; //이전
	      this.next = this.endPage < realEnd; //다음
	   }

	public int getStartPage() {
		return startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public boolean isNext() {
		return next;
	}

	public Criteria getCri() {
		return cri;
	}

}
