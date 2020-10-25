import firebase from './firebase';

export const DB_COLLECTIONS = {
  USERS: 'users',
  TODOS: 'todos',
};

export let db = firebase.firestore();
export let auth = firebase.auth();
export const getCurrentUser = () => auth.currentUser;

export default firebase;
export * from './functions/userFunctions';
export * from './functions/todoFunctions';
