
// var count = localStorage.getItem("someVarKey");
// if (isNaN(count) || count == null)
// {
//   count = 1;
//   localStorage.setItem("someVarKey", count);
// }
// setCookie("C", count, 7);
// function todo(){
//   var name = prompt("Inserisci il nome del TODO");
//   if(!name)
//       return;
//   var newDiv = document.createElement("div");
//   newDiv.classList="bella";
//   newDiv.id="list" + count;
//   setCookie("list" + count, name, 7);
//   count++;
//   localStorage.setItem("someVarKey", count);
//   setCookie("C", count, 7);
//   newDiv.onclick = function () {
//       if(confirm("Vuoi rimuovere l'elemento?")){
//           this.parentElement.removeChild(this);
//           removeCookie(this.id);
//       }
//       else
//           return;
//   };
//   newDiv.appendChild(document.createTextNode(name));
//   document.getElementById('ft_list').appendChild(newDiv);
//   var currentDiv = document.querySelector('.bella');
//   currentDiv.before(newDiv);
// }
// function setCookie(name, value, daysToLive) {
//   const date = new Date();
//   date.setTime(date.getTime() + (daysToLive *24 * 60 * 60 * 1000));
//   let expires = "expires=" + date.toUTCString();
//   document.cookie = `${name}=${value}; ${expires}; path=/`
// }
// function removeCookie(name) {
//   setCookie(name, null,null);
// }
// function getCookie(name) {
//   const cDecoded = decodeURIComponent(document.cookie);
//   const cArray = cDecoded.split("; ");
//   let result = null;
//   console.log(cArray);
//   cArray.forEach(e => {
//       if(e.indexOf(name) == 0){
//           result = e.substring(name.length + 1)
//       }
//   })
//   return result;
// }


var count = localStorage.getItem("someVarKey");
if (isNaN(count) || count == null)
{
  count = 1;
  localStorage.setItem("someVarKey", count);
}
setCookie("C", count, 7);

// Load cookies when the page loads
window.onload = function() {
  loadCookies();
};

function loadCookies() {
  // Iterate over all cookies
  var cookies = document.cookie.split("; ");
  console.log(document.cookie);
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    if (cookie.indexOf("list") === 0) {
      var value = cookie.split("=")[1];
      var newDiv = document.createElement("div");
      newDiv.classList = "bella";
      newDiv.id = cookie.split("=")[0];
      newDiv.onclick = function () {
        if (confirm("Vuoi rimuovere l'elemento?")) {
          this.parentElement.removeChild(this);
          removeCookie(this.id);
        } else {
          return;
        }
      };
      newDiv.appendChild(document.createTextNode(value));
      var ft_list = document.getElementById('ft_list');
      if (ft_list.childNodes[0]) {
        ft_list.insertBefore(newDiv, ft_list.childNodes[0]);
      } else {
        ft_list.appendChild(newDiv);
      }
    }
  }
}
function todo(){
  var name = prompt("Inserisci il nome del TODO");
  if(!name)
      return;
  var newDiv = document.createElement("div");
  newDiv.classList="bella";
  newDiv.id="list" + count;
  setCookie("list" + count, name, 7);
  count++;
  localStorage.setItem("someVarKey", count);
  setCookie("C", count, 7);
  newDiv.onclick = function () {
      if(confirm("Vuoi rimuovere l'elemento?")){
          this.parentElement.removeChild(this);
          removeCookie(this.id);
      }
      else
          return;
  };
  newDiv.appendChild(document.createTextNode(name));
  document.getElementById('ft_list').appendChild(newDiv);
  var currentDiv = document.querySelector('.bella');
  currentDiv.before(newDiv);
}

function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + (daysToLive *24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
function removeCookie(name) {
  setCookie(name, null,null);
}
function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;
  console.log(cArray);
  cArray.forEach(e => {
      if(e.indexOf(name) === 0){
          result = e.substring(name.length + 1)
      }
  })
  return result;
}








