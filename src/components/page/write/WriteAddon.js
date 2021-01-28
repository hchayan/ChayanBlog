import React from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "../../../blogFirebase";

const WriteAddon = ({
  userObj,
  onChangeImage,
  objectURL,
  setObjectURL,
  setIsUploadable,
  imageURLText,
  setImageURLText,
}) => {
  const uploadImage = async e => {
    try {
      setIsUploadable(false);
      console.log(e);
      if (e) {
        const result = await onChangeImage(e);

        if (result) {
          const attachmentRef = storageService
            .ref()
            .child(`/posts/images/${userObj.uid}/${uuidv4()}`); // 저장경로설정 '사용자id/랜덤파일이름'
          const response = await attachmentRef.putString(result, "data_url"); // (저장할파일, 데이터 형식)
          const imageURL = await response.ref.getDownloadURL();

          setImageURLText(imageURL);
          setObjectURL([...objectURL, imageURL]);
        }
      }
    } catch (error) {
      alert("이미지를 추가하는데 오류가 발생했습니다. 에러코드 : " + error);
    }
    setIsUploadable(true);
  };

  return (
    <div className="write-addon">
      <div className="write-addon__column add-image">
        <label htmlFor="local-image">이미지 추가</label>
        <input
          type="file"
          id="local-image"
          onChange={uploadImage}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default WriteAddon;
