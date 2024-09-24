import React from "react";

const EmailTemplate = ({ name, to, subject, message, link }: any) => {
  return (
    <div className="container">
      <div className="emailBox">
        <h1 className="header">{subject}</h1>
        <p className="message">{message}</p>
        <a href={link}>
          <button className="button">Confirm Email</button>
        </a>
      </div>
    </div>
  );
};

export default EmailTemplate;
