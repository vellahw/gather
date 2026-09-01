package com.our.gather.common.common;

public class Criteria {
	
	 private int pageNum; //페이지 번호
     private int amount; //한 페이지 당 보여줄 데이터 수
     
     // 한 페이지에서 보여줄 데이터 개수 : 16
     public Criteria() {
        this(1, 16);
     }
     
     // 변수에 저장
     public Criteria(int pageNum, int amount) {
		setPageNum(pageNum);
		setAmount(amount);
     }

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum < 1 ? 1 : Math.min(pageNum, 10_000);
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount < 1 ? 16 : Math.min(amount, 50);
	}

}
