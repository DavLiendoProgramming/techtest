import React, { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ id, children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  );
  const [dynamic] = useState(!el.current.parentElement);
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id, dynamic]);
  return createPortal(children, el.current);
};

memo(Portal);

const PeopleModal = ({ toggle, open, user }) => {
  return (
    <Portal>
      {open && (
        <div className="modal" onClick={() => toggle()}>
          <div className="modal__card">
            <img src={user.avatar} alt="" className="modal__card-avatar" />
            <div className="modal__card-info">
              <h3 className="modal__info-item-1">{user.name}</h3>
              <h3 className="modal__info-item-2">{user.country}</h3>
              <h3 className="modal__info-item-3">{user.createdAt}</h3>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default PeopleModal;
