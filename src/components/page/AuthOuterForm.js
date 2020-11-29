import React from "react";
import { firebaseInstance, authService } from "blogFirebase";

const AuthOuterForm = ({ newAccount, history }) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    // 1. provider 생성
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    // 2. popup
    await authService.signInWithPopup(provider);

    // 3. redirect to home
    history.push("/");
  };

  return (
    <>
      <input
        type="button"
        name="google"
        onClick={onSocialClick}
        value={newAccount ? "구글 회원가입" : "구글 로그인"}
      />
      <input
        type="button"
        name="github"
        onClick={onSocialClick}
        value={newAccount ? "github 회원가입" : "github  로그인"}
      />
    </>
  );
};

export default AuthOuterForm;
