
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getISBN13fromLink(){
  var link = window.location.href;
  var delimeter = "/dp/";
  if (link.indexOf('dp/') === -1){
    delimeter = "/product/";
  }
  return link.slice(link.indexOf(delimeter)+delimeter.length, link.indexOf(delimeter) + delimeter.length + 10) // 10 is ISBN10 length
}

function makeGoodreadsLink(isbn13){
  return "https://www.goodreads.com/search?q="+isbn13;
}

function addGoodreadsBtn(){
  var goodreads_link = makeGoodreadsLink( getISBN13fromLink() );
  var avg_custom_reviews = document.querySelector('#averageCustomerReviews');
  if (avg_custom_reviews !== null){
    avg_custom_reviews.innerHTML += `<br><br><a href="${goodreads_link}">See book on <img src="${chrome.runtime.getURL('goodreads_logo.svg')}" height="20px"/></a>`;
    return;
  }

  var book_formats = document.querySelector('#formats');
  if (book_formats !== null){
    book_formats.innerHTML += `<br><br><a href="${goodreads_link}">See book on <img src="${chrome.runtime.getURL('goodreads_logo.svg')}" height="20px"/></a>`;
    return;
  }
}

var is_book_check_1 =  getElementByXpath('//*[@id="nav-subnav"]/a[1]/span') !== null && getElementByXpath('//*[@id="nav-subnav"]/a[1]/span').innerText === "Books"
var is_book_check_2 = document.querySelector('#nav-subnav[data-category=books]') !== null

if(is_book_check_1 || is_book_check_2){
  addGoodreadsBtn();
}
