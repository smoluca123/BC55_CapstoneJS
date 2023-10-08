const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const apiUrl = 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs';
const api = new callApi();

var products = new ListProduct();

function getProduct() {
  const promise = api.fetchData(apiUrl);
  promise
    .then(function (response) {
      products.listProduct = response.data;
      renderProduct(products.listProduct);
      addSlick();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderProduct(products) {
  var iphoneItem = [];
  var samsungItem = [];
  var itemString = '';
  products.map((item) => {
    var priceFormat = (itemString = `
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
              <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to
                  cart</button>
          </div>
      </div>
      `);
    if (item.type === 'Iphone') {
      iphoneItem.push(itemString);
    } else {
      samsungItem.push(itemString);
    }

    $a('#iphonetab .products-slick').innerHTML = iphoneItem.join('');
    $a('#samsungtab .products-slick').innerHTML = samsungItem.join('');
  });
}

function detailProduct(id) {
  var product = products.getProductByID(id);
  var cateString = '<li>Category:</li><li>Smartphone:</li>';
  $a('.modal-body .breadcrumb-tree li:nth-child(3)').innerHTML = product.name;
  $a('.modal-body .product-preview img').src = product.img;
  $a('.modal-body .product-name').innerHTML = product.name;
  $a('.modal-body .product-price').innerHTML = formatUSD(product.price);
  $a('.modal-body .product-desc').innerHTML = product.desc;

  $a(
    '.product-links'
  ).innerHTML = `${cateString}<li><a >${product.type}</a></li>`;
}

getProduct();

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 1,
  }).format(Math.floor(n));
}
