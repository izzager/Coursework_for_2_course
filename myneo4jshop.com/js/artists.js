var cart = {}; //глобальная переменная, хранящая в себе товары, которые пользователь добавил в корзину

//получаем данные из БД (отсортированные по полю "артист") и вызываем функцию, показывающую их
function init() { 
    $.post(
        "core/startdb.php",
        {
            "action" : "initArtists"
        },
        showArtists 
    );
}

//выводит на страницу все товары, сгруппированные по полю артист
function showArtists(data) {
  data = JSON.parse(data); //получаем все альбомы из базы данных, сгруппированные по одинаковому артисту
  console.log(data); //выводим в консоль
  var out = ''; //в эту переменную будем складывать html-код
  for (var key in data) { // каждый элемент data[key] это - несколько альбомов
    var albs = data[key];
    out += '<div class="artist">';
    out += `<p class="name" style="font-size: 150%; font-family: Courier; text-align: center; font-weight: bold">${data[key][0].artist}</p>`;
    out += '<details><summary>Show albums</summary>'; //при нажатии на элемент показываются альбомы артиста
  	for (var keyAlb in albs) {
    		out += '<div class="cart">';
    		out += `<p class="album">` + '"' + `${albs[keyAlb].albumName}`+ '"' + `</p>`;
    		out += `<p class="year">` + 'Year:' + `${albs[keyAlb].year}</p>`;
    		var songs = albs[keyAlb].songs;
    		out += '<select size = "3" class="songs">';
    		out += '<option disabled>Songs</option>';
    		for (var song in songs) {
    			out += `<option>${songs[song]}</option>`;
    		}
    		out += '</select>';
    		out += `<div class="cost">${albs[keyAlb].cost}` + ' Rub' + `</div>`;
    		out += `<button class="add-to-cart" data-id="${albs[keyAlb].idAlbum}" art-id="${albs[keyAlb].idArtist}">Buy</button>`;
    		out += '</div>';
    }
    out += '</details>';
    out += '</div>';
  }
  $('.goods-out').html(out); //выводим на страницу
  $('.add-to-cart').on('click', addToCart); //реакция на нажатие кнопки
}

//функция добавления в корзину по id артиста и товара
function addToCart() {
  console.log(cart);
  var idAlb = $(this).attr('data-id');
  var idArt = $(this).attr('art-id');
  if (cart[idArt] == undefined) { //если в корзину еще не добавили альбом этого артиста
    cart[idArt] = {};
    cart[idArt][idAlb] = 1;
  }
  else if (cart[idArt][idAlb] == undefined) { //если в корзину уже добавлен какой-то альбом этого артиста
    cart[idArt][idAlb] = 1;                   //но не добавлен именно этот альбом
  }
  else { //если этот альбом уже есть в корзине
    cart[idArt][idAlb]++; 
  }
  showMiniCart(); //показываем мини-корзину, в которой отображается, есть ли в корзине что-то или нет
  saveCart(); //сохраняем корзину
}

function saveCart() {
  //данные корзины пользователя храним в браузере в localStorage
  //чтобы данные не пропадали при перезагрузке страницы, переходами внутри сайт и т.д.
  localStorage.setItem("cart", JSON.stringify(cart));
}

function isNotEmpty(object) {
  //проверка корзины на пустоту
  for (var key in object)
  if (object.hasOwnProperty(key)) return true;
  return false;
}

//мини-корзина, в которой отображается, есть ли в корзине что-то или нет
function showMiniCart() {
  var out = "";
  if (isNotEmpty(cart)) {
    out += 'You have goods in your cart. ';
    out += `<a href="cart.html">See cart</a>`;
  }
  $('.mini-cart').html(out);
}

function loadCart() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  showMiniCart();
}

//при загрузке страницы запускается функция получания данных из БД и загрузки корзины из localStorage
$(document).ready(function () {
  init();
  loadCart();
});