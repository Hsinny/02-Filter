var city = document.getElementById('select-city');
var resultsNum = document.getElementById('results-num');


var xhr = new XMLHttpRequest();
xhr.open('get','https://hsinny.github.io/Cafe-Nomad/api-cafes-taiwan.json',true);
xhr.send(null);
xhr.onload = function() {
  var dataObj = JSON.parse(xhr.responseText); 
  var len = dataObj.length; // 總數  
  resultsNum.textContent = len;
  
  var nodeCard = document.getElementById('card-group-custom');
  var str = '';

  /*===================================================================*/
  /* 瀏覽器最初載入完成時，畫面要顯示的資訊
  /*===================================================================*/
  var initialCity = 'taichung'; // 預設顯示台中的咖啡廳
  for (var i = 0; i < len; i++) {
    if (initialCity == dataObj[i].city) {
      var socketValue = dataObj[i].socket;
      var standingValue = dataObj[i].standing_desk;
      var limitedTimeValue = dataObj[i].limited_time;
      var wifiValue = dataObj[i].wifi;
      var displayBadge = '';
      if (socketValue == 'yes' || socketValue == 'maybe') {
        displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">插座</span>'
      }
      if (standingValue == 'yes') {
        displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">站立工作</span>'
      }
      if (limitedTimeValue == 'yes' || limitedTimeValue == 'maybe') {
        displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">限時</span>'
      }
      if (wifiValue >= 3) {
        displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">Wifi</span>'
      }
      str = str +
        `<li class="card">
            <div class="card-image">
              <img class="" src="images/card-02.jpg">
            </div>
            <div class="card-content">
              <div class="card-body">
                <h5 class="card-title">${dataObj[i].name}</h5>
                <div>
                  ${displayBadge}
                </div>
                <div> 
                  <span class="icon-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="city-name">${dataObj[i].address}</span>
                  </span>
                  <span class="icon-item">
                    <i class="fas fa-subway"></i>
                    <span class="date-range">${dataObj[i].mrt}</span>
                  </span>
                </div>
                <div> 
                  <span class="icon-item">
                    <i class="far fa-calendar-alt"></i>
                    <span class="date-range">${dataObj[i].open_time}</span>
                  </span>
                </div>
              </div>
            </div>
          </li>`;
    }
  }
  nodeCard.innerHTML = str;

  /*===================================================================*/
  /* 顯示select所選的地區來顯示
  /*===================================================================*/
  function updateList(e){
    var select = e.target.value;
    str =''; // 要再設一次空值，此func的.innerHTML 並沒有清空先前的內容
    for(var i =0; i<len; i++) {
      if (select == dataObj[i].city) {
        var socketValue = dataObj[i].socket;
        var standingValue = dataObj[i].standing_desk;
        var limitedTimeValue = dataObj[i].limited_time;
        var wifiValue = dataObj[i].wifi;
        var displayBadge = '';
        if (socketValue == 'yes' || socketValue == 'maybe') {
          displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">插座</span>'
        }
        if (standingValue == 'yes') {
          displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">站立工作</span>'
        }
        if (limitedTimeValue == 'yes' || limitedTimeValue == 'maybe') {
          displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">限時</span>'
        }
        if (wifiValue >= 3) {
          displayBadge = displayBadge + '<span class="badge badge-pill badge-primary">Wifi</span>'
        }
        
        str = str +
          `<li class="card">
            <div class="card-image">
              <img class="" src="images/card-02.jpg" widht="" height="" alt="">
            </div>
            <div class="card-content">
              <div class="card-body">
                <h5 class="card-title">${dataObj[i].name}</h5>
                <div>
                  ${displayBadge}
                </div>
                <div> 
                  <span class="icon-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="city-name">${dataObj[i].address}</span>
                  </span>
                  <span class="icon-item">
                    <i class="fas fa-subway"></i>
                    <span class="date-range">${dataObj[i].mrt}</span>
                  </span>
                </div>
                <div> 
                  <span class="icon-item">
                    <i class="far fa-calendar-alt"></i>
                    <span class="date-range">${dataObj[i].open_time}</span>
                  </span>
                </div>
              </div>
            </div>
          </li>`;
      }
    }
    nodeCard.innerHTML = str;
  }
  city.addEventListener('change', updateList, false);
}


/*===================================================================*/
/* Checkbox 操作
     1. 偵測allCheck狀態，讓所有checkbox全選/取消
     2. 任一checkbox取消，allCheck也會變取消的狀態

     3.【最初載入的狀態】需修改為全部checkbox都被勾選
/*===================================================================*/
var form = document.getElementById('checkbox-group');
var elements = form.elements;  // form內的互動元件集合
var options = elements.checkItem;  // 不包含checkAll那個，資料型態非陣列，但可用索引值選取第幾個
var optionsLen = options.length;
var checkAll = document.getElementById('checkAll');

/*===================================================================*/
/* 其他checkbok狀態會和allCheck狀態一樣
/*===================================================================*/
function updateAll() {
  for (var i = 0; i < optionsLen; i++) {
    // 
    options[i].checked = checkAll.checked;
  }
}
checkAll.addEventListener('change', updateAll, false);

/*===================================================================*/
/* 取消all的checkbox
/*===================================================================*/
function clearCheckAll(e){
  var target = e.target || e.srcElement; // srcElement為支援較舊版瀏覽器的語法 ＋ 捷徑計算
  if (!target.checked) {
    checkAll.checked = false;
  }
}

// 監聽所有checkbox，除了checkAll那個
for (var i = 0; i < optionsLen; i++){
  options[i].addEventListener('change', clearCheckAll , false);
}


/*===================================================================*/
/* Search 功能，只搜尋標題

     1. 偵測allCheck狀態，執行所有checkbox全選/取消
     2. 任一checkbox取消，allCheck也會變取消的狀態

/*===================================================================*/

// (function(){
//   var inputSearch = document.getElementById('input-search');
//   var storeNameEl = document.querySelectorAll('.card-title'); // 要加.  這個方式得到的是Node節點
//   var $storeNameEl = $('.card-title');  // 得到的為陣列
//   var cache = [];
  
//   $storeNameEl.each(function(){  // forEach()/each()為陣列的方法
//     cache.push({
//       element: this,
//       text: this.textContent.toLowerCase()
//     });
//   });

//   function search(){
//     var searchTxt = inputSearch.value.toLowerCase();
//     cache.forEach(function (title) {
//       var index = 0;
//       if(searchTxt){
//         index = title.text.indexOf(searchTxt);
//       }
//       title.element.style.display = index === -1 ? 'none' : '';
//     });
//   }

//   inputSearch.addEventListener('input',search,false);
// }());