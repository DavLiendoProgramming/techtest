import React, { memo, useEffect, useRef, useState,FormEvent } from 'react';
import { createPortal } from 'react-dom';

const TableForm =({toggle,user}) => {
    const [country, setCountry] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log("I'm the form")
    }
    const handleClick= (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        toggle();
    }
    console.log(user,"im the user")
    return (

    <div className="table__form modal" onClick={(e)=>handleClick(e)} >


      <form   onSubmit={handleSubmit} className="modal__card"                 onClick={e => e.stopPropagation()}
>
        <div className="table__form-info">
                <img src={user.avatar} alt="" className="table__info-avatar"/>
            <div className="table__info-text">
                <h3 className="table__info-name"  >{user.name}</h3>
                <h3 className="table__info-country"  >{user.country}</h3>
                <h3 className="table__info-date"  >{user.createdAt}</h3>
            </div>      
        </div>
        <div className="table__form-edit-wrap">
            <div className="table__form-edit">
                <label htmlFor="text" className="table__form-edit-label">Edit Country</label>
                <input className="table__form-input"
                id="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onClick={e => e.stopPropagation()}
                />
            </div>
            <div  className="table__form-edit"   >
                <label htmlFor="text" className="table__form-edit-label">Edit Avatar'url</label>
                <input className="table__form-input"
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                onClick={e => e.stopPropagation()}
                />
            </div>
        </div>
      </form>
    </div> 
    );
  }

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

const PeopleModal = ({ toggle, open, user, index, clickedIndex }) => {
  return (
    <Portal>
        { clickedIndex === index  &&  open && <TableForm toggle={toggle} user={user}  />}
    </Portal>
  );
};

export default PeopleModal;
