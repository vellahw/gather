/**
 * 231224 장한원
 */

document.addEventListener("DOMContentLoaded", function(){
  const categoryContainer = document.getElementById('categoryContainer');
  
  //새로 생성되는 카테고리 li
  let categoryItem = document.createElement('li');
  categoryItem.class = 'categoryItem';
  categoryItem.style = 'color:red;';
  
  //새로 생성되는 카테고리 a 태그 
  let categoryLink = document.createElement('a');
  categoryLink.class = 'categoryLink';
  categoryLink.textContent = '전체';
  // newDeleteFileInputBtn.dataset.fileName = fileName;
  
  let categoryList = document.createElement('ul');
  categoryList.class = 'categoryList';
  categoryList.appendChild(categoryItem);
  categoryList.appendChild(categoryLink);
  
  //추가해주기
  categoryContainer.appendChild(categoryList);
})
