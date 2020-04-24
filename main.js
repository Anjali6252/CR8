let apiUrl = 'http://starlord.hackerearth.com/TopSellingGam';
var responseList = [];
currentPage = 1;
pageSize = 10;
maxPage = 0;
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    responseList = data;
    maxPage = Math.ceil(responseList.length / pageSize);
    let x = getCurrentPageData();
    printCards(x);
  });

function printCards(data) {
  let elem = document.getElementById('container');
  html = ''
  data.forEach(game => {
    html += `<div class="row">
        <div>Rank: ${game.Rank}</div>
        <div>Name: ${game.Name}</div>
        <div>Platform: ${game.Platform}</div>
        <div>Year: ${game.Year}</div>
        <div>Genre: ${game.Genre}</div>
        <div>Publisher: ${game.Publisher}</div>
        <div>Global_Sales: ${game.Global_Sales}</div>
    </div>`
  });
  let MoreDetails = document.getElementById('container');

  elem.innerHTML = html;
}

function getCurrentPageData() {
  return responseList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}

function nextPage() {

  if (currentPage < maxPage) {
    currentPage += 1;
    displayCurrentPage();
    let x = getCurrentPageData();
    printCards(x);
  }
}

function displayCurrentPage() {
  document.getElementById('pageNumber').innerHTML = currentPage;
}

function previous() {
  if (currentPage > 1) {
    currentPage -= 1;
    displayCurrentPage();
    let x = getCurrentPageData();
    printCards(x);
  }
}

function filterData() {
  string = document.getElementById('searchid').value;
  console.log(string)
  let data = [];
  responseList.forEach(elem => {    
    elem.Name.toLowerCase().includes(string.toLowerCase()) ? data.push(elem) : null;  
  })
  printCards(data);
  size=data.length;
  maxPage=Math.ceil(size/pageSize);

}

function getDefinedList(){
  pageSize=document.getElementById('Showlist').value;
  if(pageSize>1){
    maxPage = Math.ceil(responseList.length / pageSize);
    let x = getCurrentPageData();
    printCards(x);
  }
  else{
    maxPage=1;
    printCards(responseList);
  } 
}
// flag=0;
function SortedGames(value){
  flag=0;
  if(flag==0){
    flag=1;
    responseList.sort(function(a,b){
    return a[value]-b[value]
  })
  }
  else if(flag==1){
    flag=0;
    responseList.reverse();
  }
  currentPage = 1;
  printCards(responseList);
}