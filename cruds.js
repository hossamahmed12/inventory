let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let expenses = document.getElementById("expenses");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// console.log(title,price,taxes,expenses,discount,total,count,category, submit);
// ! get total
function getTotal(){
    if (price.value > 0 ) {
      let result =
        +price.value + +taxes.value + +expenses.value - +discount.value;
      total.innerHTML = result;
      total.style.background = "green";
    } else {
      total.innerHTML = "0";
      total.style.background = "red";
    }
}
// ! create product

let dataPro;

// ده غلشان منسمح البيانات القديمه لما نعمل ريلود

if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}


submit.onclick = function(){
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    expenses: expenses.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != ""){
      if (mood === "create") {
        // ! count
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        }
        // ? update
      } else {
        dataPro[tmp] = newPro;
        console.log(tmp);
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
      }
  }

  // dataPro.push(newPro);
  // ! sava localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearDate();
  showData();
}




// ! clear inputs
function clearDate (){
    title.value = "";
    price.value = "";
    taxes.value = "";
    expenses.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

}
// ! read
function showData(){
  // غلشان ارجع لونها للاحمر تاني بغد اي ابديت
  getTotal()
    let table = ""; 
    for (let i = 0;i < dataPro.length; i++){
        table += `
                  <tr>
                        <th>${i+1}</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].expenses}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");

    if (dataPro.length > 0){
      btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }
    
}
// علشان البيانات تفضل موجوده تحت فى الجدول مش بس لما اضفط على الكريتت
showData();


// ! delete
function deleteData(i){
  dataPro.splice(i, 1);
  // localStorage.removeItem(i);
  localStorage.product= JSON.stringify(dataPro);  
  // بس local مش من  html علشان يظهر فى الصفحه عمليه المسح من
  showData();
}
function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// ! update
// اظهار العناصر فوق تاني في الخانات
function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  expenses.value = dataPro[i].expenses;
  discount.value = dataPro[i].discount;
  getTotal()
  // count.value = dataPro[i].count;
  // ? الفي زرار الكونت لما اغدل البيانات
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  })
  
}

// ! search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle"){
    searchMood = "title";
    search.placeholder = "Search By Title";
  }else{
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus()
  search.value = "";
  // علشان يظهر المنتجات كلها تاني بعد ما يمسح
  showData();
}
function searchData(value){
  let table = "";
  if (searchMood == "title"){
    for (let  i = 0; i < dataPro.length;i++){
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                  <tr>
                        <th>${i}</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].expenses}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `;
      }
    }
  }else{
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `
                  <tr>
                        <th>${i}</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].expenses}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `;
          }
        }
  }
  document.getElementById("tbody").innerHTML = table;
}
// ! clean data
