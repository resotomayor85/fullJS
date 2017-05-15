var arr = [-7, 1, 5, 31, 54, 87, 99, 102, 205, 254, 268, 309, 312, 378, 588, 590, 750, 1000, 4535, 7570];

var arrToJSON = {
  arrData: []
};

var data = document.getElementById("data").innerHTML;
document.getElementById("data").innerHTML = (data + "[ " + arr + " ]").replace(/,/g, ", ");

var errorMsg = document.getElementById("errorMsg");

var result = document.getElementById("result");

var prevKeysFound = [];
var prevKeysNotFound = [];

function rank(k, a) {
  if (a instanceof Array) {
    var lo = 0;
    var hi = a.length - 1;
    var mid;
    while (lo <= hi) {
      mid = Math.floor(lo + (hi - lo) / 2);
      if (k < a[mid]) hi = mid - 1;
      else if (k > a[mid]) lo = mid + 1;
      else return mid;
    }
    return -1;
  }
}

// This function executes when click event is fired by button
function display() {
  var val = document.getElementById("keyValue").value;
  if (val === "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";

    var res;
    var input = rank(val, arr);

    if (input !== -1) {
      var collection = document.getElementById("data").innerHTML;
      collection = (data + "[ " + arr + " ]").replace(/,/g, ", ");
      collection = collection.replace(val, "<span class='badge'>" + val + "</span>");
      /* <sub> " + input + " </sub>"*/
      document.getElementById("data").innerHTML = collection;

      res = "GREAT, The key <b>" + val + "</b> is located at position <b>" + rank(val, arr);
      result.className = "alert alert-success"; //found

      prevKeysFound.push(val);
      document.getElementById("prevKeysFound").innerHTML = ("[ " + prevKeysFound + " ]").replace(/,/g, ", ");
    } else {
      document.getElementById("data").innerHTML = (data + "[ " + arr + " ]").replace(/,/g, ", ");
      res = "SORRY. The key <b>" + val + "</b> wasn't found in the collection.";
      result.className = "alert alert-danger"; //notFound

      prevKeysNotFound.push(val);
      document.getElementById("prevKeysNotFound").innerHTML = ("[ " + prevKeysNotFound + " ]").replace(/,/g, ", ");
    }
    result.innerHTML = res;
  }
  jsonFn(val);
  document.getElementById("keyValue").value = "";
}

function jsonFn(pval) {
  arrToJSON.arrData.push(parseInt(pval));
  document.getElementById("jsonOutput").innerHTML = JSON.stringify(arrToJSON);
}