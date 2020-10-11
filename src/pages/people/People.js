import React, { useState, Fragment, useCallback } from 'react';
import PeopleModal from './PeopleModal';
import Loader from '../Loader';
import { useEffect } from 'react';
const People = ({ users, loadUsers }) => {
  //Toggling the modal
  const useToggle = (initial) => {
    const [open, setOpen] = useState(initial);
    return [open, useCallback(() => setOpen((status) => !status))];
  };
  const [open, toggle] = useToggle(false);

  useEffect(() => {
    if (typeof users[0] === 'undefined') {
      loadUsers();
    }
  }, [users, loadUsers]);

  return typeof users[0] === 'undefined' ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="content-wrap">
        <table className="table">
          <thead className="table-head">
            <tr className="table-row">
              <th>Name</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="table-row" key={user.name}>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>
                  <span className="table-toggler" onClick={() => toggle()}>
                    View
                  </span>
                  <PeopleModal toggle={toggle} open={open} user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default People;
