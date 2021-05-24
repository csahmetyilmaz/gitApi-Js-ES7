//Selection of elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e) {
    let username = nameInput.value.trim();

    if (username === "") {
        alert("Please enter a valid user name!")
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    //error message
                    ui.showError("User not found");
                } else {
                    ui.addSearchedUserToUi(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));

    }

    ui.clearInput(); //After search we clear input fields
    e.preventDefault();
}

function getAllSearched() {
    //Get searched items from storage to ui
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    })
    lastUsers.innerHTML = result;
}

function clearAllSearched() {
    //Clear all searched items
    if (confirm("Are you sure to delete ?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUi();
    }

}