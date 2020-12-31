import React from "react";
import { firebaseInstance, authService } from "blogFirebase";

const AuthOuterForm = ({ newAccount, history }) => {
  const onSocialClick = async name => {
    try {
      await authService
        .setPersistence(firebaseInstance.auth.Auth.Persistence.SESSION)
        .then(() => {
          // 1. provider 생성
          let provider;
          if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
          } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
          }

          return provider;
        })
        .then(provider => {
          // 2. popup
          return authService.signInWithPopup(provider);
        })
        .then(() => {
          // 3. redirect to home
          history.push("/");
        });
    } catch (error) {
      alert("외부 인증 과정중 문제가 발생했습니다 : " + error);
    }
  };

  return (
    <>
      <button
        type="button"
        name="google"
        onClick={() => onSocialClick("google")}
      >
        <i class="fab fa-google" name="google"></i>
        <p>구글 계정으로 {newAccount ? "회원가입" : "로그인"}</p>
      </button>

      <button
        type="button"
        name="github"
        onClick={() => onSocialClick("github")}
      >
        <i class="fab fa-github"></i>
        <p>깃허브 계정으로 {newAccount ? "회원가입" : "로그인"}</p>
      </button>
    </>
  );
};

export default AuthOuterForm;
