const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const apiUrl = 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs';
const api = new callApi();

var products = new ListProduct();
var cart = new Cart();

function getProduct() {
  const promise = api.fetchData(apiUrl);
  promise
    .then(function (response) {
      products.listProduct = response.data;
      renderNewProduct(products.listProduct);
      renderListProduct(products.listProduct);
      addSlick();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderNewProduct(products) {
  var iphoneItem = [];
  var samsungItem = [];
  var itemString = '';
  var newProduct = products.slice(-10);
  newProduct.map((item) => {
    itemString = `
      <div class="product">
          <div class="product-img">
              <img src="${item.img}" alt="">
              <div class="product-label">
                  <span class="sale">-30%</span>
                  <span class="new">NEW</span>
              </div>
          </div>
          <div class="product-body">
              <p class="product-category">Category</p>
              <h3 class="product-name"><a href="#">${item.name}</a></h3>
              <h4 class="product-price">${formatUSD(item.price)} <del
                      class="product-old-price">${formatUSD(
                        item.price * 1.4
                      )}</del></h4>
              <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
              </div>
              <div class="product-btns">
                  <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span
                          class="tooltipp">add to wishlist</span></button>
                  <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                          class="tooltipp">add to compare</span></button>
                  <button class="quick-view" data-toggle="modal"
                  data-target="#exampleModal" onclick="detailProduct(${
                    item.id
                  })"><i class="fa fa-eye"></i><span
                          class="tooltipp">quick view</span></button>
              </div>
          </div>
          <div class="add-to-cart">
              <button class="add-to-cart-btn" onclick="addProductToCart(${
                item.id
              })"><i class="fa fa-shopping-cart"></i> add to
                  cart</button>
          </div>
      </div>
      `;
    if (item.type === 'Iphone') {
      iphoneItem.push(itemString);
    } else {
      samsungItem.push(itemString);
    }

    $a('#iphonetab .products-slick').innerHTML = iphoneItem.join('');
    $a('#samsungtab .products-slick').innerHTML = samsungItem.join('');
  });
}
function renderListProduct(products) {
  var iphoneItem = [];
  var samsungItem = [];
  var itemString = '';
  var newProduct = products.slice(-10);
  newProduct.map((item) => {
    itemString = `
      <div class="product">
          <div class="product-img">
              <img src="${item.img}" alt="">
              <div class="product-label">
                  <span class="sale">-30%</span>
                  <span class="new">NEW</span>
              </div>
          </div>
          <div class="product-body">
              <p class="product-category">Category</p>
              <h3 class="product-name"><a href="#">${item.name}</a></h3>
              <h4 class="product-price">${formatUSD(item.price)} <del
                      class="product-old-price">${formatUSD(
                        item.price * 1.4
                      )}</del></h4>
              <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
              </div>
              <div class="product-btns">
                  <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span
                          class="tooltipp">add to wishlist</span></button>
                  <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                          class="tooltipp">add to compare</span></button>
                  <button class="quick-view" data-toggle="modal"
                  data-target="#exampleModal" onclick="detailProduct(${
                    item.id
                  })"><i class="fa fa-eye"></i><span
                          class="tooltipp">quick view</span></button>
              </div>
          </div>
          <div class="add-to-cart">
              <button class="add-to-cart-btn" onclick="addProductToCart(${
                item.id
              })"><i class="fa fa-shopping-cart"></i> add to
                  cart</button>
          </div>
      </div>
      `;

    if (item.type === 'Iphone') {
      iphoneItem.push(itemString);
    } else {
      samsungItem.push(itemString);
    }
  });
  $a('#listIphoneTab').innerHTML = iphoneItem.join('');
  $a('#listSamsungTab').innerHTML = samsungItem.join('');
}

function renderCartItem(cart) {
  var content = '';
  cart.listProduct.map((item) => {
    var itemString = `
    <div class="product-widget">
      <div class="product-img">
        <img src="${item.product.img}" alt="">
      </div>
      <div class="product-body">
        <h3 class="product-name"><a href="#">${item.product.name}</a></h3>
        <h4 class="product-price">
        <a class="text-danger" style="font-size : 26px" onclick="changeQty(${
          item.product.id
        },-1)"> - </a>
        <span class="qty" style="margin : 0 5px">${item.quantity}x</span>
        <a class="text-success" style="font-size : 26px" onclick="changeQty(${
          item.product.id
        },1)"> + </a>
        <br>
        Price : ${formatUSD(item.product.price)}</h4>
      </div>
      <button class="delete" onclick="deleteItemCart(${
        item.product.id
      })"><i class="fa fa-close"></i></button>
    </div>
    `;
    content += itemString;
  });
  $a('.cart-list').innerHTML = content;
  $a('.cart-summary span').innerHTML = cart.totalQuantity;
  $a('.cart-summary .subtotal').innerHTML = formatUSD(cart.totalPrice);
  $a('.cart-qty').innerHTML = cart.totalQuantity;
  addAnimatedCart();
}

function detailProduct(id) {
  var product = products.getProductByID(id);
  var qty = $a('.modal-qty');
  qty.value = 1;
  var cateString = '<li>Category:</li><li>Smartphone:</li>';
  $a('.modal-body .breadcrumb-tree li:nth-child(3)').innerHTML = product.name;
  $a('.modal-body .product-preview img').src = product.img;
  $a('.modal-body .product-name').innerHTML = product.name;
  $a('.modal-body .product-price').innerHTML = formatUSD(product.price);
  $a('.modal-body .product-desc').innerHTML = product.desc;
  $a('.modal-body .add-to-cart .add-to-cart-btn').onclick = function () {
    addProductToCart(id, +qty.value);
    $a('.close').click();
  };

  $a(
    '.product-links'
  ).innerHTML = `${cateString}<li><a >${product.type}</a></li>`;
}

function addProductToCart(id, qty = 1) {
  var product = products.getProductByID(id);
  var cartItem = { product, quantity: qty };
  if (!cart.listProduct.find((item) => item.product.id == id)) {
    cart.listProduct.push(cartItem);
  } else {
    var index = cart.listProduct.findIndex((item) => item.product.id == id);
    cart.listProduct[index].quantity += qty;
  }
  cart.tinhTotalPrice();
  cart.tinhTotalQuantity();
  setCartLocalStoregrade(cart.listProduct);

  renderCartItem(cart);
}

function deleteItemCart(id) {
  var index = cart.listProduct.findIndex((item) => item.product.id == id);
  cart.listProduct.splice(index, 1);
  cart.tinhTotalPrice();
  cart.tinhTotalQuantity();
  setCartLocalStoregrade(cart.listProduct);

  renderCartItem(cart);
}

function clearCart() {
  cart.listProduct = [];
  cart.tinhTotalPrice();
  cart.tinhTotalQuantity();
  setCartLocalStoregrade(cart.listProduct);

  renderCartItem(cart);
}

function changeQty(id, n) {
  var index = cart.listProduct.findIndex((item) => item.product.id == id);
  cart.listProduct[index].quantity += n;
  cart.tinhTotalPrice();
  cart.tinhTotalQuantity();
  setCartLocalStoregrade(cart.listProduct);
  renderCartItem(cart);
}

function setCartLocalStoregrade(data) {
  localStorage.setItem('cart', JSON.stringify(data));
}

function getCartLocalStoregrade() {
  if (localStorage.getItem('cart')) {
    cart.listProduct = JSON.parse(localStorage.getItem('cart'));
    cart.tinhTotalPrice();
    cart.tinhTotalQuantity();
    renderCartItem(cart);
  }
}

getProduct();
getCartLocalStoregrade();

function addSlick() {
  // Products Slick
  $('.products-slick').each(function () {
    var $this = $(this),
      $nav = $this.attr('data-nav');

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

  // Products Widget Slick
  $('.products-widget-slick').each(function () {
    var $this = $(this),
      $nav = $this.attr('data-nav');

    $this.slick({
      infinite: true,
      autoplay: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
    });
  });
}

function formatUSD(n) {
  var numFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.floor(n));
  return numFormat.slice(0, numFormat.length - 3); //bỏ 3 kí tự .00
}

function addAnimatedCart() {
  var cartEle = $a('.dropdown-toggle i');
  cartEle.classList.remove(
    'animate__animated',
    'animate__rubberBand',
    'animate__faster'
  );
  setTimeout(() => {
    cartEle.classList.add(
      'animate__animated',
      'animate__rubberBand',
      'animate__faster'
    );
  }, 1);
}
