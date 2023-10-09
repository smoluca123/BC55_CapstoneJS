function Cart() {
  this.listProduct = [];
  this.totalPrice = 0;
  this.totalQuantity = 0;
  this.tinhTotalPrice = function () {
    this.totalPrice = 0;
    this.listProduct.map((item) => {
      this.totalPrice += item.product.price * item.quantity;
    });
  };
  this.tinhTotalQuantity = function () {
    this.totalQuantity = 0;
    this.listProduct.map((item) => {
      this.totalQuantity += item.quantity;
    });
  };
}
