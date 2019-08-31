import * as React from 'react';
import { Button, Chip, CircularProgress, Grid, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import user from 'src/user';
import { useStore } from 'effector-react';
import { Effect } from 'effector';

interface IProps {

}

const useIsPending = (event: Effect<any, any, any>): boolean => {
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    event.pending.watch(setIsPending)
  }, []);
  return isPending;
};

const Auth: React.FC<IProps> = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const loginIsLoading = useIsPending(user.actions.login);
  const getUserDataIsLoading = useIsPending(user.actions.getUserData);

  const userData = useStore(user.store.userData);
  const jwt = useStore(user.store.jwt);

  const onLogin = () => {
    user.actions.login({ password, login });
  };

  if (loginIsLoading) {
    return <CircularProgress />
  }

  if (jwt) {
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Chip color={'primary'} label={`Jwt: ${jwt}`} />
        {
          getUserDataIsLoading &&
          <CircularProgress />
          ||
          <Chip color={'primary'} label={`User mail: ${userData && userData.email}`} />
        }
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <TextField
        placeholder={'Login'}
        value={login}
        onChange={(event) => setLogin(event.target.value)}
        margin="normal"
      />
      <TextField
        placeholder={'Password'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
      />
      <Button onClick={onLogin} variant="contained" color="primary">
        Login
      </Button>
    </Grid>
  );
};

export default Auth;