import { ActionTypes, DataTypes } from './Types';
import { DataSource } from './DataSource';

const url = 'https://5f3f012c13a9640016a69302.mockapi.io/users';
const dataSource = new DataSource();
export const loadUsers = () => ({
  type: ActionTypes.USERS_LOAD,
  payload: dataSource.GetData(url).then((response) => ({
    dataType: DataTypes.USERS,
    data: response.data,
  })),
});
