import React from "react";
import { Helmet } from "react-helmet-async";

function Modal({ CloseModal, children }) {
  return (
    <div className="parent-of-model">
      <Helmet>
        <style type="text/css">{`
          
          .parent-of-model{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index:999;
          }

          .modal{
            background-color: whitesmoke;
            width: 400px;
            height: 333px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            animation: mymove  0.8s;
            overflow-y: auto;

          }
          
          
          @keyframes mymove {
            0%   {  scale: 0; transform: translateY(-100vh);}
        
            100% {  scale: 1; transform: translateY(0);}
          } 
          
          
          
          `}</style>
      </Helmet>
      <form className={`modal`}>
        <div
          onClick={() => {
            CloseModal();
          }}
          className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </form>
    </div>
  );
}

export default Modal;
