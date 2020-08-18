import React from "react";
import cookie from "js-cookie";
import Axios from "axios";

const Modal = ({ handleClose, show, company }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleSubmit = () => {
    let token = cookie.get("token");
    let data = {
      student: cookie.get("username"),
      company: company.name,
    };
    Axios.post("/interview", data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <div class='modal-content'>
          <center>
            <span className='modal-alert'>
              Do you wish to continue interview process with
              <span className='company-name'>{company.name}.</span>
            </span>
            <br />
            <button className='modal-button btn' onClick={handleSubmit}>
              Accept
            </button>
            <button className='modal-button btn' onClick={handleClose}>
              Decline
            </button>
          </center>
        </div>
      </section>
    </div>
  );
};

export default Modal;
