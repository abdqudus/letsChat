import React from "react";
const ImgPreviewSmall = ({ url, changeImg, id }) => {
  return (
    <img
      id={id}
      onClick={() => {
        console.log(id);
        changeImg(id);
      }}
      style={{ width: "50px", height: "50px" }}
      src={url}
    />
  );
};
export default ImgPreviewSmall;
