const users = [];

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }  

  save() {
    users.push(this);
  }

  static findUser(userEmail) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === userEmail) {
        return users[i];
      }
    }
  }
}

module.exports = User;