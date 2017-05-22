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
      this.registerUser(user, password);
    });
  }

  logout(user) {
    if (!this.userExists(user)) return false;
    if (!this.sessions[user]) return false;
    return delete this.sessions[user];
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
    this.logout(user);
    return delete this.users[user];
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

    this.registerUser(user, newPassword);
    return true;
  }

  login(user, password) {
    if (!this.userExists(user)) throw new Error('User invalid.');
    if (!this.checkPassword(user, password)) throw new Error('Password invalid.');
    this.sessions[user] = true;
  }

};
