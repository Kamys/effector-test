import { createEffect, createStore, Effect } from 'effector';
import api from 'src/user/api';
import { IUser } from 'src/user/type';

export const login = createEffect('login', {
  handler: api.login,
});

login.pending.watch(pending => {
  console.log('pending - ', pending) // false
})

export const getUserData = createEffect('getUserData', {
  handler: api.getUserData,
});

export const jwt = createStore<string>(null)
  .on(login.done, (_, { result: { jwt } }) => jwt);

export const userData = createStore<IUser>(null)
  .on(getUserData.done, (_, { result: user }) => user);

login.done.watch(({ result: { jwt } }) => {
  getUserData(jwt);
});