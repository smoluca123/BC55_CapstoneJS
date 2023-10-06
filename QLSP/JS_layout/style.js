function Info() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backcamera").value;
  var frontCamera = document.getElementById("frontcamera").value;
  var picture = document.getElementById("picture").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  var productInfo = {
    id: id,
    name: name,
    price: price,
    screen: screen,
    backCamera: backCamera,
    frontCamera: frontCamera,
    picture: picture,
    desc: desc,
    type: type,
  };
  return productInfo;
}
