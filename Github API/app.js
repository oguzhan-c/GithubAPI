// Select Element

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("github-name");
const clearLastUsers = document.getElementById("clear-last-users");//button for delete
const lastUsers = document.getElementById("last-users");//for log

const github = new Github();
const ui = new UI();

eventListener();
 
function eventListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(event){

    let userName =nameInput.value.trim();

    if (userName === "") {
        ui.showError("Please enter a valid input!!!");
    }
    else{
        github.getGithubData(userName)
        .then(response => {
            if (response.user.message === "Not Found") {
                ui.showError("This UserName is void.Please enter a valid UserName!!!");
            }
            else{
                //ui function have to be before storage function because: first load ui and then record the storage
                ui.addSearchedUserToUI(userName);
                Storage.addSearchedUserToStorage(userName);
                ui.showUserInfo(response.user);//show about user
                //console.log(response.user);//for controlle
                ui.showRepoInfo(response.repo);//show user repo

            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();//İnput Clear

    event.preventDefault();
}

function clearAllSearched(event) {
    //Delete All Searched

    if (confirm("Are you sure ?")) {
        //Delete
        Storage.clearAllSearchedUsersFromStorage(); // Clear from storage

        ui.clearAllSearchedFromUI();
    }

    event.preventDefault();
}

function getAllSearched(event) {
// Get searched from Storage and add UI

let users =Storage.getSearchedUsersFromStorage();

let result = "";

users.forEach(user =>{
    result += `<li class="list-group-item">${user}</li>`;
});

lastUsers.innerHTML = result;

event.preventDefault();

}