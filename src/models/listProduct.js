function ListProduct() {
  this.listProduct = [];

  this.getProductByID = function (id) {
    return this.listProduct.find((product) => product.id == id);
  };
}
