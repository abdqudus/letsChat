import React, { useEffect, useState } from "react";
import Close from "../img/close.png";
import { clearLocalStorage } from "../utils/getMsgAndImg";
import { useDispatch } from "react-redux";
import { showSelectedImg } from "../store/selectedImg/selected-img-actions";
const ImgPreviewTemplate = ({ url, index }) => {
  const dispatch = useDispatch();
  const initialMsg = localStorage.getItem(`msg-${index}`);
  const [caption, setCaption] = useState(initialMsg ? initialMsg : "");
  useEffect(() => {
    localStorage.setItem(`msg-${index}`, caption);
  }, [caption]);
  return (
    <>
      <img
        onClick={() => {
          localStorage.removeItem(`msg-${index}`);
          clearLocalStorage();
          dispatch(showSelectedImg(false));
        }}
        className="close-btn"
        src={Close}
        alt=""
      />
      <div className="selected-img-wrapper">
        <img src={url} alt="" />
      </div>

      <input
        type="text"
        placeholder="Add  caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </>
  );
};
export default ImgPreviewTemplate;
