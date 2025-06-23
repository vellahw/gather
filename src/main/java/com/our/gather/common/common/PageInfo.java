package com.our.gather.common.common;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PageInfo {

    //전체 카운트
    private int totalCnt = 0; //초기값 설정

    //페이지 번호
    private String page = "1"; //초기값 설정

    //한페이지에 표시될 레코드 수
    private String rowPerPage = "10"; //초기값 설정

    //start row
    private String startRow;

    //end row
    private String endRow;

    //이전 페이지 여부
    private boolean isPrevPage;

    //다음 페이지 여부
    private boolean isNextPage;

    //전체 페이지 수
    private int totalPages = 0; //초기값 설정

    //페이징 유무
    private String pagingYn = "N"; //초기값 설정

    public PageInfo(String pagingYn, String page, String rowPerPage, int totalCnt) {
        this.pagingYn = pagingYn;
        this.page = page;
        this.rowPerPage = rowPerPage;
        this.totalCnt = totalCnt;
    }

    public String getStartRow() {
        return String.valueOf(((Integer.parseInt(getPage()) - 1) * Integer.parseInt(getRowPerPage())) + 1);
    }

    public String getEndRow() {
        return String.valueOf((Integer.parseInt(getPage()) * Integer.parseInt(getRowPerPage())));
    }

    public String getPage() {

        //아래 코드는 파라미터 조작시 에러를 방지하기 위한 예외 처리 이다.
        if(page == null) {
            page = "1";
        }

        try {
            Integer.parseInt(page);
        } catch(NumberFormatException e) {
            page = "1";
        }

        if(Integer.parseInt(page) < 1) {
            page = "1";
        }

        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public String getRowPerPage() {

        //아래 코드는 파라미터 조작시 에러를 방지하기 위한 예외 처리 이다.
        if(rowPerPage == null) {
            rowPerPage = "10";
        }

        try {
            Integer.parseInt(rowPerPage);
        } catch(NumberFormatException e) {
            rowPerPage = "10";
        }

        if(Integer.parseInt(rowPerPage) < 1) {
            rowPerPage = "10";
        }

        return rowPerPage;
    }

    public void setRowPerPage(String rowPerPage) {
        this.rowPerPage = rowPerPage;
    }

    public boolean getIsPrevPage() {
        if(Integer.parseInt(this.page) <= 1) {
            return false;
        }
        return true;
    }

    public boolean getIsNextPage() {
        if(this.totalCnt <= Integer.parseInt(getEndRow())) {
            return false;
        }
        return true;
    }

    public int getTotalCnt() {
        return totalCnt;
    }

    public void setTotalCnt(int totalCnt) {
        this.totalCnt = totalCnt;
    }

    public int getTotalPages() {
        return  ( (this.totalCnt - 1) / Integer.valueOf(this.rowPerPage) ) + 1;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public void setPagingYn(String pagingYn) {
        this.pagingYn = pagingYn;
    }

    public String getPagingYn() { return pagingYn; }

}
