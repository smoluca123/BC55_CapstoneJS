function callApi() {
  this.fetchData = function (apiUrl) {
    return axios({
      method: 'GET',
      url: apiUrl,
    });
  };
  this.getByID = function (apiUrl, id) {
    return axios({
      method: 'GET',
      url: apiUrl + '/' + id,
    });
  };
  this.postApi = function (apiUrl, data) {
    return axios({
      method: 'POST',
      url: apiUrl,
      data: data,
    });
  };
  this.deleteApi = function (apiUrl, data) {
    return axios({
      method: 'DELETE',
      url: apiUrl,
      data: data,
    });
  };
}
