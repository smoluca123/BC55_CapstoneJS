const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const api = new callApi();

function getProduct() {
  const apiUrl =
    'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs';
  const promise = api.fetchData(apiUrl);
  promise
    .then(function (response) {
      renderProduct(response.data);
      xuLySlickBatDongBo();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderProduct(products) {
  var iphoneItem = '';
  var samsungItem = '';

  products.map((item) => {
    if (item.type === 'iphone') {
      iphoneItem += `
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
                <h4 class="product-price">$${item.price} <del
                        class="product-old-price">$${
                          item.price * 1.4
                        }</del></h4>
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
                    <button class="quick-view"><i class="fa fa-eye"></i><span
                            class="tooltipp">quick view</span></button>
                </div>
            </div>
            <div class="add-to-cart">
                <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to
                    cart</button>
            </div>
        </div>
        `;
    } else {
      samsungItem += `
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
                <h4 class="product-price">$${item.price} <del
                        class="product-old-price">$${
                          item.price * 1.4
                        }</del></h4>
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
                    <button class="quick-view"><i class="fa fa-eye"></i><span
                            class="tooltipp">quick view</span></button>
                </div>
            </div>
            <div class="add-to-cart">
                <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to
                    cart</button>
            </div>
        </div>`;
    }

    $a('#iphonetab .products-slick').innerHTML = iphoneItem;
    $a('#samsungtab .products-slick').innerHTML = samsungItem;
  });
}

getProduct();

function xuLySlickBatDongBo() {
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
