//DanhSachSanPham
var api = new CallApi();
var products = [];

function getListProduct() {
  var promise = api.fectchData();
  promise
    .then(function (result) {
      products = result.data;
      // console.log(result.data);
      renderPR(products);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();
function Search() {
  var input = document.getElementById("SearchProduct").value;

  const data = products.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
  renderPR(data);
}
function showAddDialog() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backcamera").value = "";
  document.getElementById("frontcamera").value = "";
  document.getElementById("picture").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("type").value = "";
  var buttonEdit = document.querySelector(".modal-footer");
  buttonEdit.innerHTML = `<button type="button" class="btn btn-primary" onclick="getInfoProduct()" id="btnAdd">Add</button>`;
}

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
      <img src="${product.img}" alt="" width="50px" height="50px">
      </td>
      <td>${product.desc}</td>
      <td>${product.type}</td>
      <td> 
       
        <button onclick="editProduct(${
          product.id
        })" data-toggle="modal" data-target="#exampleModalCenter" style="border:none; background-color:transparent; padding-left:5px;"><i class ="fa fa-pencil" ></i></button> 
        <button onclick="deleteProduct(${
          product.id
        })" style="border:none ; background-color:transparent; padding-left:5px"><i class="fa-solid fa-trash"></i>
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
  //validate
  var isvalid = true;
  isvalid &= kiemTraRong(name, "tb-name", "Vui lòng không bỏ trống");
  isvalid &= kiemTraRong(screen, "tb-screen", "Vui lòng không bỏ trống");
  isvalid &= kiemTraRong(
    backCamera,
    "tb-backcamera",
    "Vui lòng không bỏ trống"
  );
  isvalid &= kiemTraRong(
    frontCamera,
    "tb-frontcamera",
    "Vui lòng không bỏ trống"
  );
  isvalid &= kiemTraRong(img, "tb-picture", "Vui lòng không bỏ trống");
  isvalid &= kiemTraRong(desc, "tb-desc", "Vui lòng không bỏ trống");
  isvalid &= kiemTraRong(type, "tb-type", "Vui lòng không bỏ trống");
  isvalid &= kiemTraSo(
    price,
    "tb-price",
    "Không đúng định dạng vui lòng nhập số ",
    "Vui lòng không bỏ trống"
  );
  if (!isvalid) {
    return null;
  }
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
  addProduct(product);
}
function addProduct(data) {
  var promise = api.addProduct(data);

  promise
    .then(function (data) {
      console.log(data);
      var checkValidate = getValueInput();
      if (checkValidate) {
        getListProduct(checkValidate);
        NotiAlert("success", "Them thanh cong", 2000);
      }
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
      NotiAlert("error", "Xoa thanh cong", 2000);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function infoEdit(product) {
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("screen").value = product.screen;
  document.getElementById("backcamera").value = product.backCamera;
  document.getElementById("frontcamera").value = product.frontCamera;
  document.getElementById("picture").value = product.img;
  document.getElementById("desc").value = product.desc;
  document.getElementById("type").value = product.type;
  var modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = "Edit product ";
  var buttonEdit = document.querySelector(".modal-footer");
  buttonEdit.innerHTML = `<button class="btn btn-danger" onclick="updateProduct(${product.id})" >Update edit</button>`;
}
//
function editProduct(id) {
  var promise = api.getProduct(id);
  promise
    .then(function (result) {
      infoEdit(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateProduct(id) {
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backcamera").value;
  var frontCamera = document.getElementById("frontcamera").value;
  var img = document.getElementById("picture").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  console.log(product);

  var promise = api.editProduct(id, product);
  promise
    .then(function () {
      var checkValidate = getValueInput();
      if (checkValidate) {
        getListProduct(checkValidate);
        NotiAlert("success", "ThanhCong", 1000);
        document.getElementById("close").click();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
//sapxep
