import React, { useState } from "react";
import AuthForm from "components/page/AuthForm";
import AuthOuterForm from "components/page/AuthOuterForm";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  let history = useHistory();

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container__column">
          <div className="logo">
            <img
              alt="gogo"
              src="https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e"
            />
          </div>
          <h3>{newAccount ? "회원가입" : "로그인"}</h3>
        </div>
        <div className="auth-container__column">
          <div className="social-login">
            <p>소셜 계정 {newAccount ? "회원가입" : "로그인"}</p>
            <AuthOuterForm newAccount={newAccount} history={history} />
          </div>
        </div>
        <div className="auth-container__column">
          <p>이메일로 {newAccount ? "회원가입" : "로그인"}</p>
          <AuthForm
            newAccount={newAccount}
            setNewAccount={setNewAccount}
            history={history}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
