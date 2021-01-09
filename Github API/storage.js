class Storage{
    static getSearchedUsersFromStorage(){
        //Get All Users
        
        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUserToStorage(userName){
        //add user
        let users = this.getSearchedUsersFromStorage();//this => point the Storage Class.
        //IndexOf => if return -1 its meaning serached is not absent. 
        if (users.indexOf(userName) === -1) {
            users.push(userName);
            console.log("This key is exist");
        }

        localStorage.setItem("searched",JSON.stringify(users));//update storage
    }  
    static clearAllSearchedUsersFromStorage(){
        //clear all

        localStorage.removeItem("searched");//delete 
    }
}