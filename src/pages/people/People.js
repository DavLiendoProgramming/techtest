import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PeopleAction from './PeopleAction';
export const People = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'https://5f3f012c13a9640016a69302.mockapi.io/users'
      );
      setData({ data: response.data });
    };
    fetchData();
  }, []);
  return data === undefined || data === {} ? (
    <Fragment>
      <h1>Waiting for data</h1>
    </Fragment>
  ) : (
    <Fragment>
      <div className="content-wrap">
        <table id="table">
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
          <tr>
            {data.data.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>
                  <PeopleAction user={user} />
                </td>
              </tr>
            ))}
          </tr>
        </table>
      </div>
    </Fragment>
  );
};
