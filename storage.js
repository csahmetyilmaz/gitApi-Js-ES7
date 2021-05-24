//Only data storage process
class Storage {
    constructor() {
    }

    static getSearchedUsersFromStorage() {//Get all users
        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }


    static addSearchedUserToStorage(username) { //Add user


        let users = this.getSearchedUsersFromStorage();

        //indexOf  - Result is -1 means absence in array
        if (users.indexOf(username) === -1) {
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));


    }

    static clearAllSearchedUsersFromStorage() { //Clear all users from storage
        localStorage.removeItem("searched");
    }

}