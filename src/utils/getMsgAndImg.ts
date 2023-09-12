type MessageArray = {
  text: string | null;
  img?: string | null;
};
const getMsgAndImg = () => {
  const msgArr: MessageArray[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    if (element) {
      if (element.includes("msg-")) {
        const content = localStorage.getItem(element);
        msgArr.push({ text: content });
      }
    }
  }
  const images: string[] = JSON.parse(localStorage.getItem("images") as string);
  images.forEach((i, ind) => {
    msgArr[ind].img = i;
  });
  // clearLocalStorage();
  return msgArr;
};
export const clearLocalStorage = () => {
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    if (element?.includes("msg-")) localStorage.removeItem(element);
  }
  localStorage.removeItem("images");
};
export default getMsgAndImg;
