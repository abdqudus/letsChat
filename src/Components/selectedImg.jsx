import React, { useContext, useEffect, useRef, useState } from "react";
import Send from "../img/send-message.png";
import ImgPreviewTemplate from "./imgPreviewTemplate";

import { selectedImgContext } from "../Contexts/SelectedImgContext";
import getMsgAndImg, { clearLocalStorage } from "../utils/getMsgAndImg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { AuthContext } from "../Contexts/AuthContext";
import { ChatContext } from "../Contexts/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestoredb } from "..";
import { v4 as uuid } from "uuid";
import ImgPreviewSmall from "./ImgPreviewSmall";
const SelectedImg = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [imgId, setImgID] = useState(0);
  const { img } = useContext(selectedImgContext).state;
  const { dispatch } = useContext(selectedImgContext);
  const sortedImg = img.sort((a, b) => a.index - b.index);
  useEffect(() => {
    sortedImg.forEach((i, ind) => {
      localStorage.setItem(`msg-${ind}`, "");
    });
    localStorage.setItem("images", JSON.stringify(img));
  }, []);
  const changeImg = (id) => {
    setImgID(id);
  };
  const images = sortedImg.map((i) => (
    <ImgPreviewSmall
      id={i.index}
      key={i.index}
      url={i.url}
      changeImg={changeImg}
    />
  ));

  const handleSend = async () => {
    const msgData = getMsgAndImg();
    clearLocalStorage();
    console.log(msgData);
    const storage = getStorage();
    dispatch({
      type: "show selected image",
      payload: false,
    });
    for (const msg of msgData) {
      try {
        const fileRef = ref(
          storage,
          `files/${currentUser.uid}/${currentUser.displayName + uuid()}`
        );
        await uploadString(fileRef, msg.img.url, "data_url");
        const url = await getDownloadURL(fileRef);
        await updateDoc(doc(firestoredb, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: msg.text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            url,
          }),
        });
        await updateDoc(doc(firestoredb, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text: msg.text,
            url,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestoredb, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text: msg.text,
            url,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="selected-img-div">
      <ImgPreviewTemplate
        index={img[imgId].index}
        key={img[imgId].index}
        url={img[imgId].url}
        dispatch={dispatch}
        changeImg={changeImg}
      />
      <div className="img-preview-div">{images}</div>
      <div className="send-img-btn-div" onClick={handleSend}>
        <img className="send-img-btn" src={Send} alt="send image" />
      </div>
    </div>
  );
};

export default SelectedImg;
