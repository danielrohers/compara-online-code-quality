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
    return !!this.users[user];
  }

  // Register user
  registerUser(user, password) {
    this.users[user] = password;
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
    const userPassword = this.users[user];
    if (!userPassword) return false;
    return userPassword === password;
  }

  updatePassword(user, oldPassword, newPassword) {
    // First we check if the user exists
    if (!this.userExists(user)) return false;

    // Check if the old password is correct
    if (!this.checkPassword(user, oldPassword)) return false;

    this.users[user] = newPassword;
    return true;
  }

  login(user, password) {
    if (!this.userExists(user)) throw new Error('User invalid.');
    if (!this.checkPassword(user, password)) throw new Error('Password invalid.');
    this.sessions[user] = true;
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
