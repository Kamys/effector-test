import { getUserData, login, userData, jwt } from 'src/user/store';

export default { actions: { getUserData, login }, store: { userData, jwt } }