const contactsForm = document.querySelector(".contactsForm");
const addContactBtn = document.querySelector("#addContactBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const createBtn = document.querySelector("#createBtn");
const submissionForm = document.querySelector("#submissionForm");
const phoneNumber = document.querySelector("#phoneNumber");
const nameText = document.querySelector("#name");
const contactsContainer = document.querySelector(".contacts");
const userCardContainer = document.querySelector(".user-card-container");
const contactContent = document.querySelector(".contact-content");
const trashContent = document.querySelector(".trash-content");
const trashTab = document.querySelector("#trashTab");
const contactTab = document.querySelector("#contactTab");
console.log(trashContent, contactContent);
// console.log(
//   contactsForm,
//   addContactBtn,
//   cancelBtn,
//   createBtn,
//   submissionForm,
//   nameText,
//   phoneNumber
// );
let activeTab = "contact";
const savedUsers = JSON.parse(localStorage.getItem("users"));
console.log(savedUsers);
const users = savedUsers || [];
addContactBtn.addEventListener("click", function () {
  contactsForm.style.display = "block";
});
cancelBtn.addEventListener("click", function () {
  contactsForm.style.display = "none";
});
submissionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameText.value;
  const number = phoneNumber.value;
  const user = {
    id: Math.floor(Math.random() * 1000),
    name,
    number,
    createdAt: new Date().toISOString(),
  };
  //We can Push a user
  users.push(user);
  console.log(users);
  //save to Localstorage
  console.log(JSON.stringify(users));
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
  nameText.value = "";
  phoneNumber.value = "";
});

function renderUsers() {
  contactsContainer.innerHTML = "";
  users.forEach((user) => {
    const userHtml = `<div class="contact">
          <a href="#">
            <div class="name">
              <p>${user.name}</p>
            </div>
            <p>${user.number}</p>
          </a>
          <div class="editing-features">
            <button onclick='viewUser(${user.id})' title="view contact"><i class='bx bxs-happy-heart-eyes'></i></button>
            <button><i class="bx bxs-edit-alt"></i></button>
            <button><i class="bx bx-trash"></i></button>
          </div>
        </div>
    `;
    contactsContainer.insertAdjacentHTML("beforeend", userHtml);
  });
}

renderUsers();

//Creating item in the localStorage
localStorage.setItem("name", "JB");
//Get Item
const name = localStorage.getItem("name");
console.log(name);

// localStorage.removeItem("users");

function viewUser(id) {
  const user = users.find((user) => user.id == id);
  console.log(user);
  const dateArr = user.createdAt.split("T");
  console.log(dateArr);
  userCardContainer.innerHTML = `
  <div class="user-card">
        <h3>User Details</h3>
        <div>
          <h2>User Id: ${user.id}</h2>
          <h2>Full Name: ${user.name}</h2>
          <h2>Phone Number: ${user.number}</h2>
          <h2>Created At: ${dateArr[0]}</h2>
          <div class="dtn">
            <button id="cancelBtn" type="button" class="closeBtn">Close</button>
          </div>
        </div>
      </div>
  `;
}

function renderTabContent() {
  if (activeTab === "contact") {
    trashContent.classList.add("hideTabContent");
    contactContent.classList.remove("hideTabContent");
    contactTab.classList.add("activceTab");
    console.log("Contact is Active");
  } else {
    contactContent.classList.add("hideTabContent");
    trashContent.classList.remove("hideTabContent");
    contactTab.classList.remove("activceTab");
    trashTab.classList.add("activceTab");
    console.log("Trash is Active");
  }
}
renderTabContent();
function setActiveTab(tab) {
  activeTab = tab;
  renderTabContent();
  console.log(activeTab);
}
console.log(activeTab);
