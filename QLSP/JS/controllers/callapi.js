// const { default: axios } = require("axios")

// a

// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs",
      method: "GET",
    });
    return promise;
  };
  this.addProduct = function (data) {
    var promise = axios({
      url: "https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs",
      method: "POST",
      data: data,
    });
    return promise;
  };
  this.deleteProduct = function (id) {
    return axios({
      url:
        "https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs/" + id,
      method: "DELETE",
    });
  };
  this.getProduct = function (id) {
    return axios({
      url:
        "https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs/" + id,
      method: "GET",
    });
  };
  this.editProduct = function (id, data) {
    var promise = axios({
      url:
        "https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs/" + id,
      method: "PUT",
      data: data,
    });
    return promise;
  };
}
