import React, { useEffect, useState } from "react";
import Send from "../img/send-message.png";
import ImgPreviewTemplate from "./imgPreviewTemplate";

import getMsgAndImg, { clearLocalStorage } from "../utils/getMsgAndImg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
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
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { selectContactSlice } from "../store/contacts/contact-selector";
import { selectedImgSlice } from "../store/selectedImg/selected-img-selector";
import { showSelectedImg } from "../store/selectedImg/selected-img-actions";
const SelectedImg = () => {
  const currentUser = useSelector(selectCurrentUser);
  const data = useSelector(selectContactSlice);
  const [imgId, setImgID] = useState(0);
  const { img } = useSelector(selectedImgSlice);
  const dispatch = useDispatch();
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
    const storage = getStorage();
    dispatch(showSelectedImg(false));
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
        await updateDoc(doc(firestoredb, "userChats", data.contactInfo.uid), {
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
