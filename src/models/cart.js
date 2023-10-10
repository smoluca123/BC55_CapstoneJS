function Cart() {
  this.listProduct = [];
  this.totalPrice = 0;
  this.totalQuantity = 0;
  this.tinhTotalPrice = function () {
    this.totalPrice = 0;
    this.listProduct.map((item) => {
      if (item.quantity <= 0) {
        item.quantity = 0;
      }
      this.totalPrice += item.product.price * item.quantity;
    });
  };
  this.tinhTotalQuantity = function () {
    this.totalQuantity = 0;
    var newProduct = [...this.listProduct];
    newProduct.map((item) => {
      if (item.quantity <= 0) {
        var index = this.listProduct.findIndex(
          (item2) => item2.product.id == item.product.id
        );
        this.listProduct.splice(index, 1);
        return;
      }
      this.totalQuantity += item.quantity;
    });
  };
}
