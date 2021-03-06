import React, { useEffect, useState } from "react";
import { ReactTinyLink } from "react-tiny-link";

import { v4 as uuidv4 } from "uuid";
import { storageService } from "../../../blogFirebase";
import WriteAddon from "./WriteAddon";

import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextApi,
} from "@uiw/react-md-editor";

const WriteForm = ({
  userObj,
  onChangeImage,
  objectURL,
  setObjectURL,
  markdownContent,
  setMarkdownContent,
  setIsUploadable,
}) => {
  // 1. 이미지 업로드
  const uploadImage = async e => {
    try {
      setIsUploadable(false);

      if (e) {
        const result = await onChangeImage(e);

        if (result) {
          const attachmentRef = storageService
            .ref()
            .child(`/posts/images/${userObj.uid}/${uuidv4()}`); // 저장경로설정 '사용자id/랜덤파일이름'
          const response = await attachmentRef.putString(result, "data_url"); // (저장할파일, 데이터 형식)
          const imageURL = await response.ref.getDownloadURL();

          setObjectURL([...objectURL, imageURL]);
          setIsUploadable(true);
          return imageURL;
        }
      }
    } catch (error) {
      alert("이미지를 추가하는데 오류가 발생했습니다. 에러코드 : " + error);
    }
    setIsUploadable(true);
    return null;
  };

  const getImageURL = async (e, handle) => {
    const url = await uploadImage(e);
    handle.textApi.replaceSelection(`![](${url})\n`);
    handle.close();
  };

  // 2. 오픈 그래프 양식
  const [openGraphUrl, setOpenGraphUrl] = useState("");
  const [openGraph, setOpenGraph] = useState(null);
  const [ogLoading, setOgLoading] = useState(false);

  const onChangeOpenGraphUrl = e => {
    setOpenGraphUrl(e.target.value);
  };

  const getOpengraph = () => {
    setOgLoading(true);
    setOpenGraph(
      <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={openGraphUrl}
      />
    );
    setOgLoading(false);
  };

  const addOpengraph = (e, handle) => {
    const openGraphHTML = document
      .querySelector(".addon-opengraph-preview")
      .innerHTML.replace("><", ">\n<");

    handle.textApi.replaceSelection(`${openGraphHTML}\n`);
    handle.close();

    setOpenGraphUrl("");
    setOpenGraph(null);
  };

  return (
    <MDEditor
      value={markdownContent}
      onChange={setMarkdownContent}
      height={810}
      commands={[
        // title tags
        commands.group(
          [
            commands.title1,
            commands.title2,
            commands.title3,
            commands.title4,
            commands.title5,
            commands.title6,
          ],
          {
            name: "title",
            groupName: "title",
            buttonProps: { "aria-label": "Insert title" },
          }
        ),

        // upload local image
        commands.group([], {
          name: "update",
          groupName: "update",
          icon: (
            <svg viewBox="0 0 1024 1024" width="12" height="12">
              <path
                fill="currentColor"
                d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
              />
            </svg>
          ),
          children: handle => {
            return (
              <div
                className="addon-upload-image"
                style={{ width: 250, padding: 10 }}
              >
                <div className="addon-upload-image-title">사진 업로드</div>

                <input
                  type="file"
                  id="local-image"
                  onChange={e => getImageURL(e, handle)}
                  accept="image/*"
                />
                <div
                  className="addon-upload-image-close"
                  onClick={() => handle.close()}
                >
                  x 닫기
                </div>
              </div>
            );
          },
          execute: (state, api) => {},

          buttonProps: { "aria-label": "Insert title" },
        }),

        // get open graph
        commands.group([], {
          name: "opengraph",
          groupName: "opengraph",
          icon: <span>오픈그래프</span>,
          children: handle => {
            return (
              <div
                className="addon-opengraph"
                style={{ width: 550, padding: 10 }}
              >
                <div className="addon-opengraph-title">오픈그래프 생성</div>

                <input
                  type="text"
                  placeholder="오픈그래프 생성할 링크를 입력해주세요"
                  value={openGraphUrl}
                  onChange={onChangeOpenGraphUrl}
                />
                <div className="addon-opengraph-preview">
                  {openGraph === null ? "미리보기" : openGraph}
                </div>
                {openGraph === null ? (
                  !ogLoading ? (
                    <div className="addon-opengraph-btns">
                      <div
                        className="addon-opengraph-btn"
                        onClick={getOpengraph}
                      >
                        오픈그래프 생성하기
                      </div>
                    </div>
                  ) : (
                    "로딩중"
                  )
                ) : (
                  <div className="addon-opengraph-btns">
                    <div
                      className="addon-opengraph-btn addon-opengraph-renew"
                      onClick={getOpengraph}
                    >
                      오픈그래프 재생성하기
                    </div>
                    <div
                      className="addon-opengraph-btn"
                      onClick={e => addOpengraph(e, handle)}
                    >
                      본문에 추가하기
                    </div>
                  </div>
                )}

                <div
                  className="addon-opengraph-close"
                  onClick={() => handle.close()}
                >
                  x 닫기
                </div>
              </div>
            );
          },
          execute: (state, api) => {},

          buttonProps: { "aria-label": "Insert title" },
        }),

        commands.divider,
        commands.bold,
        commands.italic,
        commands.strikethrough,
        commands.hr,
        commands.divider,
        commands.link,
        commands.quote,
        commands.code,
        commands.image,
        commands.divider,
        commands.unorderedListCommand,
        commands.orderedListCommand,
        commands.checkedListCommand,
        commands.divider,
        commands.codeEdit,
        commands.codeLive,
        commands.codePreview,
        commands.divider,
        commands.fullscreen,
      ]}
    />
  );
};

export default WriteForm;
