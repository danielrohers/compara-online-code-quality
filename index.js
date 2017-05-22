// This class is used for logins

'use strict';

module.exports = class Login {
  constructor(hash) {
    this.sessions = {};
    this.users = {};

    if (typeof hash !== 'object') return;

    Object.keys(hash).forEach((user) => {
      const password = hash[user];
      if (typeof password !== 'string') {
        throw new Error(`User password ${user} is not a String`);
      }
      this.users[user] = password;
    });
  }

  logout(user) {
    try {
      let exists = true;
      this.sessions.forEach((session, i) => {
        exists = session === user;
        if (exists) {
          this.sessions[i] = null;
        }
      });
      this.sessions = this.sessions.filter(session => session !== null);
      return exists;
    } catch (e) {
      return false;
    }
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
    if (!this.userExists(user)) return false;
    const index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
    return true;
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
