import { auth } from './init';

export const getCurrentUser = () => auth.currentUser;

export * from './functions/userFunctions';
export * from './functions/todoFunctions';
