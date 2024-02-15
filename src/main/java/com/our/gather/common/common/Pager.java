package com.our.gather.common.common;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pager {
   private Long page;   // 현재 게시판 페이지
   private Long perPage;   // 페이지당 글의 갯수
   private Long totalPage;   // 전체 페이지의 갯수
   private Long startRow;   // 현재 페이지의 시작 글번호
   private Long lastRow;   // 현재 페이지의 마지막 글번호
   private Long block;      // 현재 pagionation
   private Long perBlock;   // pagination당 page갯수
   private Long startNum;   // pagination의 시작 페이지번호
   private Long lastNum;   // pagination의 마지막 페이지번호
   private boolean pre;   // 이전페이지
   private boolean next;   // 다음페이지
   
   public Pager() {
      this.page=1L;
      this.perPage=10L;
      this.perBlock=10L;
   }
   
   public void setRow() {
       
      this.startRow =  (this.getPage()-1)*this.getPerPage();
      this.lastRow = this.getPage()*this.getPerPage();
   }
   
   public void setNum(Long totalCount) {
       // 게시판 글의 총 갯수로 전체페이지의 수 계산
      this.totalPage = totalCount%this.getPerPage()==0 ? totalCount/this.getPerPage() : totalCount/this.getPerPage()+1;
        // 전체 페이지수로 전체블록의 수를 계산
      Long totalBlock = totalPage%this.getPerBlock()==0 ? totalPage/this.getPerBlock() : totalPage/this.getPerBlock()+1;
        
      /* 현재페이지에 해당하는 현재블록을 계산*/
      Long curBlock = this.getPage()%this.getPerBlock()==0 ? this.getPage()/this.getPerBlock() : this.getPage()/this.getPerBlock()+1; 
      
        /* 현재블록의 startNum, lastNum을 구함
       curBlock   startNum   lastNum
       1         1         5
       2         6         10
       3         11         16
      */
      this.startNum= (curBlock-1)*this.getPerBlock() + 1;
      this.lastNum= curBlock*this.getPerBlock();
      
        //현재블록이 마지막블록이면 lastNum은 마지막페이지번호임
      if(curBlock==totalBlock) {
         this.lastNum=totalPage;
      }
        // 2번 페이지이상 부터 이전버튼 활성화
      if(this.page>1) {
         pre=true;
      }else{
         pre=false;
      }
      //현재블록이 마지막블록보다 작으면 다음버튼 활성화
      if(curBlock<totalBlock) {
         next=true;
      }else{
         next=false;
      }
      
   }

   private Long getPerBlock() {
	// TODO Auto-generated method stub
	return null;
   }

   public Long getPerPage() {
      if(this.perPage==null) {
         this.perPage=10L;
      }
      return perPage;
   }
   
    // 페이지가 null이거나 음수이면 1로 초기화 (사용자가 임의로 페이지에 이상한 값을 입력해서 이동을 방지)
   public Long getPage() {
      if(this.page==null || this.page<=0) {
         this.page=1L;
      }
      return page;
   }
   
}