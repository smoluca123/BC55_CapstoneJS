//DanhSachSanPham
var api = new CallApi();

function getListProduct() {
  var promise = api.fectchData();
  promise
    .then(function (result) {
      console.log(result.data);
      renderPR(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

function renderPR(data) {
  var table = document.querySelector(".DanhSachSanPham");
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
      <tr>
      <td>${i + 1}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.screen}</td>
      <td>${product.backCamera}</td>
      <td>${product.frontCamera}</td>
      <td>
      <img src="${product.img}" alt="" width="50px">
      </td>
      <td>${product.desc}</td>
      <td>${product.type}</td>
      <td>
        <button onlick="editProduct(${
          product.id
        })"><i class ="fa fa-pencil" ></i></button>  
        <button onclick="deleteProduct(${
          product.id
        })"><i class="fa-solid fa-trash"></i>
        </button>
      </td>
      </tr>
    `;
  }
  table.innerHTML = content;
}
function getValueInput() {
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backcamera").value;
  var frontCamera = document.getElementById("frontcamera").value;
  var img = document.getElementById("picture").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  var InfoValue = {
    name: name,
    price: price,
    screen: screen,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: img,
    desc: desc,
    type: type,
  };
  return InfoValue;
}
function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
function getInfoProduct() {
  var Info = getValueInput();
  var product = new Product(
    "",
    Info.name,
    Info.price,
    Info.screen,
    Info.backCamera,
    Info.frontCamera,
    Info.img,
    Info.desc,
    Info.type
  );
  console.log(product);
  addProduct(product);
}
function addProduct(data) {
  var promise = api.addProduct(data);
  promise
    .then(function (data) {
      console.log(data);
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function deleteProduct(id) {
  var promise = api.deleteProduct(id);
  promise
    .then(function () {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
