// This class is used for logins

'use strict';

module.exports = class Login {
  constructor(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({ k, v: hash[k] })).map((e) => {
      this.users = this.users.concat([e.k]);
      this.passwords = this.passwords.concat([e.v]);
    });
  }

  logout(user) {
    this.sessions.forEach((session, i) => {
      if (session === user) {
        this.sessions[i] = null;
      }
    });
    this.sessions = this.sessions.filter(session => session !== null);
  }

  // Checks if user exists
  userExists(user) {
    // Temp variable for storing the user if found
    let temp = '';
    for (const i of this.users) {
      if (i === user) {
        temp = user;
      }
    }
    const exists = (temp !== '' && temp === user);
    return exists;
  }

  // Register user
  registerUser(user, password) {
    const lastIndex = this.users.length;
    this.users[lastIndex] = user;
    this.passwords[lastIndex] = password;
  }

  removeUser(user) {
    const index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
  }

  checkPassword(user, password) {
    const index = this.idx(user, this.users);
    const passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
  }

  updatePassword(user, oldPassword, newPassword) {
    // First we check if the user exists
    let user1 = '';
    for (const i of this.users) {
      if (i === user) {
        user1 = user;
      }
    }
    if (user1 === user) {
      const index = this.idx(user, this.users);
      if (this.passwords[index] === oldPassword) {
        this.passwords[index] = newPassword;
        return true;
      }
    }
    return false;
  }

  login(user, password) {
    const index = this.idx(user, this.users);
    if (this.passwords[index] === password) {
      this.sessions.push(user);
    } else {
      throw new Error('Password invalid.');
    }
  }

  // Gets index of an element in an array
  idx(element, array) {
    let cont = 0;
    for (const i of array) {
      if (i === element) {
        return cont;
      }
      cont += 1;
    }
    return cont;
  }
};
