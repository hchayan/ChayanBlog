import React from "react";

const AuthOuterForm = ({ newAccount, setNewAccount }) => {
  return (
    <>
      <input
        type="button"
        value={newAccount ? "구글 회원가입" : "구글 로그인"}
      />
      <input
        type="button"
        value={newAccount ? "github 회원가입" : "github  로그인"}
      />
    </>
  );
};

export default AuthOuterForm;
