import test from 'ava';
import Login from './index';

const registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3',
};

let login;

test('fails new Login()', (t) => {
  try {
    login = new Login({ user1: registeredUsers });
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test('new Login()', (t) => {
  try {
    login = new Login(registeredUsers);
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});

test('user exists', (t) => {
  const result = login.userExists('user1');
  t.is(result, true);
});

test('fails user exists', (t) => {
  const result = login.userExists('');
  t.is(result, false);
});

test('check password', (t) => {
  const result = login.checkPassword('user1', 'pass1');
  t.is(result, true);
});

test('fails check password', (t) => {
  const result = login.checkPassword('user1', 'pass2');
  t.is(result, false);
});

test('register user', (t) => {
  const user = 'user4';
  login.registerUser(user, 'pass4');
  t.is(login.userExists(user), true);
});

test('fails update password invalid user', (t) => {
  const result = login.updatePassword('user');
  t.is(result, false);
});

test('fails update password invalid password', (t) => {
  const result = login.updatePassword('user1', 'pass2');
  t.is(result, false);
});

test('update password', (t) => {
  const result = login.updatePassword('user1', 'pass1', 'pass99');
  t.is(result, true);
});

test('fails login invalid user', (t) => {
  try {
    login.login('user', 'pass4');
    t.fail();
  } catch (e) {
    t.is(e.message, 'User invalid.');
  }
});

test('fails login invalid password', (t) => {
  try {
    login.login('user4', 'pass');
    t.fail();
  } catch (e) {
    t.is(e.message, 'Password invalid.');
  }
});

test('login', (t) => {
  try {
    login.login('user4', 'pass4');
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});

test('fails logout user invalid', (t) => {
  const result = login.logout('user');
  t.is(result, false);
});

test('fails logout user without session', (t) => {
  const result = login.logout('user1');
  t.is(result, false);
});

test('logout', (t) => {
  const result = login.logout('user4');
  t.is(result, true);
});

test('fails remove user', (t) => {
  const result = login.removeUser('user');
  t.is(result, false);
});

test('remove user', (t) => {
  const result = login.removeUser('user4');
  t.is(result, true);
});
