var bookUrl = document.getElementById("bookmarkURL");
var bookName = document.getElementById("bookmarkName");
var boxModal = document.querySelector(".box-info");
var books = [];
if (localStorage.getItem("booksContainer")) {
  books = JSON.parse(localStorage.getItem("booksContainer"));
  displayData();
}
function addBook() {
  if (ValidationName() && ValidationUrl()) {
    var book = {
      bookUrl: bookUrl.value,
      bookName: bookName.value,
    };
    books.push(book);
    localStorage.setItem("booksContainer", JSON.stringify(books));
    clearForm();
    displayData();
  } else {
    // boxModal.classList.remove("d-none");
    Swal.fire({
      title: "Invalid Data ?",
      text: `${ValidationName() == false ? "Please Enter Site Name" : ""} ${ValidationUrl() == false ? "and valid Url" : ""}`,
      icon: "error"
    });
  }
}
function clearForm() {
  bookUrl.value = "";
  bookName.value = "";
  bookUrl.classList.remove("is-valid", "is-invalid");
  bookName.classList.remove("is-valid", "is-invalid");
}
function displayData() {
  var cartona = "";
  for (i = 0; i < books.length; i++) {
    cartona += `
  <tr>
    <td>${i + 1}</td>
    <td>${books[i].bookName}</td>
    <td>
    <button onclick="visitMe('${
      books[i].bookUrl
    }')"  class="btn btn-outline-primary py-3 px-4 m-2"><i class="fa-solid fa-eye pe-2"></i> visit</button>
  </td>
  <td>
    <button onclick="deleteBook(${i})" class="btn  btn-outline-dark py-3 px-4 m-2" ><i class="fa-solid fa-trash-can"></i> delete</button>
  </td>
  </tr>
    `;
  }
  document.getElementById("data").innerHTML = cartona;
}
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("booksContainer", JSON.stringify(books));
  displayData();
}
function visitMe(bookUrl) {
  var link =
    bookUrl.startsWith("http://") || bookUrl.startsWith("https://")
      ? bookUrl
      : "https://" + bookUrl;
  window.open(link, "_blank");
}
function ValidationName() {
  var text = bookName.value;
  var regex = /[a-zA-Z]{4,}/gm;
  if (regex.test(text) == true) {
    bookName.classList.add("is-valid");
    bookName.classList.remove("is-invalid");
    return true;
  } else {
    bookName.classList.add("is-invalid");
    bookName.classList.remove("is-valid");
    return false;
  }
}
function ValidationUrl() {
  var text = bookUrl.value;
  var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})|[a-zA-Z]{1,}\.com/gi;
  if (regex.test(text) == true) {
    bookUrl.classList.add("is-valid");
    bookUrl.classList.remove("is-invalid");
    return true;
  } else {
    bookUrl.classList.add("is-invalid");
    bookUrl.classList.remove("is-valid");
    return false;
  }
}
function exit() {
  boxModal.classList.add("d-none");
}
