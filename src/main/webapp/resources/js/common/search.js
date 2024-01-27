/**
 * 
 */
function goSearch(element) {
  const keyword = element.getAttribute('data-hash');
  location.href = `/gather.com?keyword=${keyword}`
}