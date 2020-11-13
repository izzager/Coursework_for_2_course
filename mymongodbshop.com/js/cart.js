var cart = {};

var generalGoods = {};

//get data from database and show it
function init() {
  $.post(
    "core/startdb.php",
    {
      "action" : "init"
    },
    function(data){
      generalGoods = data;
      generalGoods = JSON.parse(generalGoods);
      console.log(generalGoods);
      loadCart(data);
    }
  );
}

function loadCart(data) {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    showCart();
  }
  else {
    var temp = '';
    temp += 'Cart is empty!! ';
    temp += `<a href="index.html">Home</a>`;
  $('.main-cart').html(temp);
  }
}

function showCart() {
	if (!isEmpty(cart)) {
      var temp='';
      temp += 'Cart is empty! ';
      temp += `<a href="index.html">Home</a>`;
      $('.main-cart').html(temp);
  }
  else {
		console.log(cart);
		var goods = generalGoods;
		var out = '';
		var totalAmount = 0;
		for (var idArt in cart) {                        //search in database elements with desired id
			for (var good in goods) {                      //and show full information about good
				if (goods[good]._id.$id == idArt) {
					albs = cart[idArt];
					for (var idAlb in albs) {
						out += `<button data-id="${idAlb}" art-id="${idArt}" class="del-goods">x</button>`;
						goodsAlb = goods[good].albums;
						for (albm in goodsAlb) {
							if (goodsAlb[albm].idAlbum == idAlb) {
								out += `${'  ' + goods[good].artist + ' "' + goodsAlb[albm].albumName + '" '}`;
								out += ` <button data-id="${idAlb}" art-id="${idArt}" class="minus-goods">-</button> `;
								out += `${albs[idAlb]}`;
								out += ` <button data-id="${idAlb}" art-id="${idArt}" class="plus-goods">+</button> `;
								out += 'Cost: ';
								out += `${albs[idAlb] * goodsAlb[albm].cost}`;
								totalAmount += albs[idAlb] * goodsAlb[albm].cost;
							}
						}
						out += '<br>';
						out += '<br>';
						
					}
				}
			}
		}
		out += '<p style="font-size: 125%;"> Total: ' + totalAmount + ' Rub</p>';
		$('.main-cart').html(out);
		$('.del-goods').on('click', delGoods);
		$('.plus-goods').on('click', plusGoods);
		$('.minus-goods').on('click', minusGoods);
	}
}

function delGoods() {
    //delete good from cart
    var idAlb = $(this).attr('data-id');
	var idArt = $(this).attr('art-id');
    delete cart[idArt][idAlb];
	
	var checkEmpty = true;
	for (var key in cart[idArt]) {
		checkEmpty = false;
	}
	if (checkEmpty) delete cart[idArt];
	
    saveCart();
    loadCart(generalGoods);
}

function plusGoods() {
    //add unit of good in cart
    var idAlb = $(this).attr('data-id');
	var idArt = $(this).attr('art-id');
	cart[idArt][idAlb]++;
    saveCart();
    loadCart(generalGoods);
}

function minusGoods() {
    //reduce the amount of good per unit
	var idArt = $(this).attr('art-id');
    var idAlb = $(this).attr('data-id');
    if (cart[idArt][idAlb] > 1) {
		cart[idArt][idAlb]--;
	}
	else {
		delete cart[idArt][idAlb];
	}
	
	var checkEmpty = true;
	for (var key in cart[idArt]) {
		checkEmpty = false;
	}
	if (checkEmpty) delete cart[idArt];
	
    saveCart();
    loadCart(generalGoods);
}

function saveCart() {
    //save cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //check emptyness of cart
    for (var key in object)
		if (object.hasOwnProperty(key)) return true; //array of arrays
    return false;
}


function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') { 
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data == 1) {
                        alert('Order was made');
                    }
                    else {
                        alert('Order was not made. Try to make order again');
                    }
                }
            );
        }
        else {
            alert('Cart is empty');
        }
    }
    else {
        alert('Fill in the fiels');
    }
	
}


$(document).ready(function () {
	init();
	$('.send-email').on('click', sendEmail); // send mail with order
});