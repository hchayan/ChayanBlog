import React, { useState } from "react";
import { authService } from "blogFirebase";
import { Link } from "react-router-dom";

const AuthForm = ({ newAccount, setNewAccount, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create account
        // 계정 생성하면 사용자는 바로 로그인 된다 공식 문서에 써있어서 따로 로그인도 안해줘도댐
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        await authService.signInWithEmailAndPassword(email, password);
      }

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="local-login">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="아이디(이메일)를 입력하세요"
          required
          value={email}
          onChange={onChange}
          autoComplete={true}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={password}
          onChange={onChange}
          autoComplete={true}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {error}
      </form>
      <div className="link">
        <span>
          <Link to="/">&lt; 홈으로 이동</Link>
        </span>
        <span onClick={toggleAccount}>
          {newAccount ? "로그인" : "회원가입"}
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
