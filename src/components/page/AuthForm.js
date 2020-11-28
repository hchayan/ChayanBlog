import react, { useState } from "react";

const AuthForm = ({ newAccount, setNewAccount }) => {
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
    //
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="아이디(이메일)를 입력하세요"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
    </>
  );
};

export default AuthForm;
