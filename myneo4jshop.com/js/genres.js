var cart = {}; //глобальная переменная, хранящая в себе товары, которые пользователь добавил в корзину

//получаем данные из БД и вызываем функцию, показывающую их
function init() { 
    $.post(
        "core/startdb.php",
        {
            "action" : "initGenres"
        },
        showGenres
    );
}

function showGenres(data) {
  data = JSON.parse(data); //получаем все жанры, которые есть в БД
  console.log(data); //выводим в консоль
	var out = ''; //в эту переменную будем складывать html-код
	for (var genre in data) {             //выводим каждый год и для каждого года кнопку, 
		out += '<div class="genre">';      //при нажатии на которую будет выдаваться список альбомов этого года
		out += `<p  style="font-size: 150%; font-family: Courier; text-align: center; font-weight: bold">${data[genre]}</p>`;
		out += `<details class="genre-name ${data[genre]}" genre-id="${data[genre]}" ><summary>Show more</summary>`;
		out += '</details>';
		out += '</div>';
	}
   $('.goods-out').html(out); //выводим на страницу
	$('.genre-name').on('click', showAlbumOfOneGenre); //показывается список альбомов этого жанра
	$('.add-to-cart').on('click', addToCart); //реакция на нажатие кнопки
}


function showAlbumOfOneGenre() {
	var idG = $(this).attr('genre-id'); //узнаем, на какой жанр было нажатие
	console.log(idG);
	$.post(                   //отправляю запрос с жанром
    "core/genres.php",
    {
			"genre": idG //название жанра
    },
    function(data){ //в data находятся альбомы нужного жанра
			var outTmp = '';
			outTmp += '<div class="detail"><p> </p>'; //<p> </p> нужно для css-разметки
			data = JSON.parse(data);
			console.log(data);
      var albs = data;
			for (var keyAlb in albs) { //выводим на страницу полученные альбомы
				outTmp += '<div class="cart">';
				outTmp += `<p class="name">${albs[keyAlb].artist}</p>`;
				outTmp += `<p class="album">` + '"' + `${albs[keyAlb].albumName}`+ '"' + `</p>`;
				outTmp += `<p class="year">` + 'Year:' + `${albs[keyAlb].year}</p>`;
				var songs = albs[keyAlb].songs;
				outTmp += '<select size = "3" class="songs">';
				outTmp += '<option disabled>Songs</option>';
				for (var song in songs) {
					outTmp += `<option>${songs[song]}</option>`;
				}
				outTmp += '</select>';
				outTmp += `<div class="cost">${albs[keyAlb].cost}` + ' Rub' + `</div>`;
				outTmp += `<button class="add-to-cart" data-id="${albs[keyAlb].idAlbum}" art-id="${albs[keyAlb].idArtist}">Buy</button>`;
				outTmp += '</div>';
			}
			outTmp += '</div>';
			$('.genre-name').html(outTmp); //показываем альбомы
			$('.genre-name').each(function(){ //удаляем альбомы из тех полей, где они не должны быть
				if ($(this).attr('genre-id') != idG) { 
					$(this).attr('open', false);
					$(this).html('');
				}
			});
			$('.add-to-cart').on('click', addToCart); //реакция на нажатие кнопки купить
    }
  );
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