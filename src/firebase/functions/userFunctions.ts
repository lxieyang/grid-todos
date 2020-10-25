import { auth } from '../index';

// https://firebase.google.com/docs/auth/web/password-auth
export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return auth.signOut();
};
