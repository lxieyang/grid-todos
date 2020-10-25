import { auth, db, DB_COLLECTIONS, getCurrentUser } from '../index';

// https://firebase.google.com/docs/auth/web/password-auth
export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password).then((result) => {
    if (result) {
      const uid = result.user?.uid;
      db.collection(DB_COLLECTIONS.USERS).doc(uid).set({
        showList: true,
      });
    }
  });
};
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const updateListShowStatus = (to: boolean) => {
  const uid = getCurrentUser()?.uid;
  if (uid) {
    db.collection(DB_COLLECTIONS.USERS).doc(uid).update({
      showList: to,
    });
  }
};

export const signOut = () => {
  return auth.signOut();
};
