// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
//var $stateInput = document.getElementById("datetime");
//var $searchBtn = document.getElementById("search");

var $title = document.getElementById("title");
var $education=document.getElementById("edu");
var $experience=document.getElementById("exp");
var $train = document.getElementById("train");
//var $Shape=document.getElementById("shape");
//var $sideSearch = document.getElementById("sideSearch");



// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
//$searchBtn.addEventListener("click", handleSearchButtonClick);
//$sideSearch.addEventListener("click",handlesideSearchButtonClick)
// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;

function load() {
    
    loadList();
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = filteredAddresses.slice(begin, end);
    renderTable();
    check();
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}
// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < pageList.length; i++) {
    // Get get the current address object and its fields
    var address = pageList[i];
    var fields = Object.keys(address);
   // console.log(fields)
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      //console.log(field)
      if(field=="title")
      {
          add=address[field].split("*")[0];
          //console.log(add);
      }
      else
            add=address[field];
      var $cell = $row.insertCell(j);
      $cell.innerText = add;
    }
  }
}


function optionChanged(value){
  if(value=="All"){
    filteredAddresses = dataSet   
    loadList();
  }
  else{
  filteredAddresses = dataSet.filter(function(address) {
    // address is a variable of dataSet.js ,that contains all the data.
    var addTitle = address.title;
    var emp2016=address.emp_2016;
    var emp_2026=address.emp_2026;
    var occ_201626=address.occ_201626;
    var addEdu=address.education.trim();
    var addExp=address.experience.trim();
    var addTr=address.training.trim();
    var medianwage=address.medianwage;
    
   

    if (addEdu===value.trim() || addExp === value.trim() || addTr === value.trim() )
    {
      
      return true;
    }
    
    return false;
  });
  loadList();
}
}

function optionChanged(value){
  if(value=="All"){
    filteredAddresses = dataSet   
    loadList();
  }
  else{
  filteredAddresses = dataSet.filter(function(address) {
    // address is a variable of dataSet.js ,that contains all the data.
    var addTitle = address.title;
    var emp2016=address.emp_2016;
    var emp_2026=address.emp_2026;
    var occ_201626=address.occ_201626;
    var addEdu=address.education.trim();
    var addExp=address.experience.trim();
    var addTr=address.training.trim();
    var medianwage=address.medianwage;
    
   

    if (addEdu===value.trim() || addExp === value.trim() || addTr === value.trim() )
    {
      
      return true;
    }
    
    return false;
  });
  loadList();
}
}

window.onload = load;

