import { ILoginPayload, IUser } from 'src/user/type';

const login = ({ login, password }: ILoginPayload): Promise<{ jwt: string }> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ jwt: '12ed234ed3' }), 1000)
  })
};

const getUserData = (jwt: string): Promise<IUser> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      email: 'vasa.mail',
      status: 'online',
    }), 2000)
  })
};

export default { login, getUserData }