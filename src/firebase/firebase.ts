import * as firebase from 'firebase/app';
import { firebaseConfig } from './secrets';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
