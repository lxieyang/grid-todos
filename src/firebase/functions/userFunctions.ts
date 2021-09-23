import { db, auth } from '../init';
import { getCurrentUser } from '../index';
import { DB_COLLECTIONS } from '../../shared/constants';
import {
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signInUser,
  signOut as signOutUser,
} from 'firebase/auth';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

export const usersRef = collection(db, DB_COLLECTIONS.USERS);

// https://firebase.google.com/docs/auth/web/password-auth
export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return createUser(auth, email, password).then(result => {
    if (result) {
      const uid = result.user?.uid;
      setDoc(doc(usersRef, uid), {
        showList: true,
      });
    }
  });
};
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return signInUser(auth, email, password);
};

export const updateListShowStatus = (to: boolean) => {
  const uid = getCurrentUser()?.uid;
  if (uid) {
    updateDoc(doc(usersRef, uid), {
      showList: to,
    });
  }
};

export const signOut = () => {
  return signOutUser(auth);
};
