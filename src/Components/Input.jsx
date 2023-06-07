import React, { useContext, useState, useEffect, useRef } from "react";
import Cancel from "../img/cancel.png";
import Smiley from "../img/happy (1).png";
import Attach from "../img/attach-file.png";
import Send from "../img/send-message.png";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../Contexts/AuthContext";
import { ChatContext } from "../Contexts/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestoredb } from "../index";
import { showEmojiContext } from "../Contexts/ShowEmojiContext";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { selectedImgContext } from "../Contexts/SelectedImgContext";
const Input = ({ emoji }) => {
  const imgArref = useRef([]);
  const [dataurl, setDataUrl] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [images, setImages] = useState(null);
  const imgDispatch = useContext(selectedImgContext).dispatch;
  const { dispatch } = useContext(showEmojiContext);
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const textRef = useRef(null);
  const handleShowEmoji = () => {
    dispatch({ type: "show emoji", payload: true });
    setCancel(true);
  };
  const handleSelectImg = async (e) => {
    const img = e.target.files;
    const imgArray = Array.from(img);
    imgArray.forEach((img, i) => {
      toDataURL(img, i); //I passed index also as a parameter cos i noticed the images
      //are not arranged the way it was selected.
      //So i needed a mechanism to be able differentiate one image from the other.
    });
  };
  useEffect(() => {
    if (dataurl.length > 0 && dataurl.length === imgArref.current.length) {
      localStorage.setItem(
        "images",
        JSON.stringify(dataurl.sort((a, b) => a.index - b.index))
      );
      imgDispatch({
        type: "show selected image",
        payload: { showSelectedImg: true, img: dataurl },
      });
    }
  }, [dataurl.length]);

  function toDataURL(image, index) {
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      imgArref.current.push({ index, url: e.target.result });

      setDataUrl([...imgArref.current]);
    });
    reader.readAsDataURL(image);
  }

  const hideCancel = () => {
    dispatch({ type: "show emoji", payload: false });
    setCancel(false);
  };
  const handleSend = async () => {
    if (text) {
      textRef.current = text;
      setText("");
      try {
        await updateDoc(doc(firestoredb, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: textRef.current,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(firestoredb, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text: textRef.current,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestoredb, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text: textRef.current,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (emoji) {
      setText((prev) => prev + emoji);
    }
  }, [emoji]);
  return (
    <section className="message-input-section">
      {cancel && (
        <img src={Cancel} alt="remove emoji interface" onClick={hideCancel} />
      )}
      <img src={Smiley} alt="emoji picker" onClick={handleShowEmoji} />
      <input
        type="file"
        accept="image/*"
        multiple
        name="file"
        id="img"
        style={{ display: "none" }}
        onChange={handleSelectImg}
      />
      <label htmlFor="img">
        <img src={Attach} alt="attachments" />
      </label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        type="text"
        name="text"
        value={text}
        placeholder="Message"
      />
      <img src={Send} alt="send icon" onClick={handleSend} />
    </section>
  );
};

export default Input;
