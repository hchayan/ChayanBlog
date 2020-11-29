import React, { useState } from "react";
import AuthForm from "components/page/AuthForm";
import AuthOuterForm from "components/page/AuthOuterForm";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  let history = useHistory();

  return (
    <div className="login-container">
      <div className="login-container__column">
        <img src="https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e" />
        <h3>로그인</h3>
      </div>
      <div className="login-container__column">
        <p>소셜 로그인</p>
        <AuthOuterForm
          newAccount={newAccount}
          setNewAccount={setNewAccount}
          history={history}
        />
      </div>
      <div className="login-container__column">
        <p>이메일로 로그인</p>
        <AuthForm newAccount={newAccount} history={history} />
      </div>
    </div>
  );
};

export default Auth;
