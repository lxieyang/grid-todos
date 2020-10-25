import React, { useState } from 'react';

import { Container, Button, FormGroup, Label, Input } from 'reactstrap';

import firebase, { signInWithEmailAndPassword, signUpWithEmailAndPassword, signOut } from '../../firebase';

import './Auth.css';

interface Props {
  user: firebase.User | null | undefined;
}

const Auth: React.FC<Props> = ({ user }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogIn = () => {
    signInWithEmailAndPassword(email.trim(), password.trim());
  };

  const handleSignUp = () => {
    signUpWithEmailAndPassword(email.trim(), password.trim());
  };

  const handleSignOut = () => {
    signOut();
  };

  if (user === undefined) {
    return null;
  }

  return (
    <Container>
      <div className="AuthContainer">
        <div className="Auth">
          {/* sign out */}
          {user && (
            <>
              <FormGroup>
                <Label>
                  <strong>Current User: </strong>
                  {user.email}
                </Label>
              </FormGroup>
              <FormGroup>
                <Button onClick={handleSignOut}>Sign out</Button>
              </FormGroup>
            </>
          )}

          {/* sign in */}
          {!user && (
            <>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johndoe@123.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button onClick={handleSignUp} color="primary">
                  Sign up
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleLogIn} color="secondary">
                  Log in
                </Button>
              </FormGroup>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Auth;
