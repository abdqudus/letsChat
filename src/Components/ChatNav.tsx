import { useEffect } from "react";
import BackArrow from "../img/back.png";
import { formatLastSeen } from "../utils/dateUtility";
import defaultDP from "../img/user.png";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../store/user/user.selector";
import { showSmallScreenMessage } from "../store/window-size/window.action";
import { selectContactSlice } from "../store/contacts/contact-selector";
import { setOnlineStatus } from "../utils/onlineStatus";
import { selectConnectionStatus } from "../store/connection/connection.selector";
const ChatNav = () => {
  const { isOnline, lastOnline } = useSelector(selectConnectionStatus);
  const data = useSelector(selectContactSlice);
  const currentUser = useSelector(selectCurrentUser);
  let lastSeenString;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showSmallScreenMessage());
  };
  useEffect(() => {
    if (data.chatId !== "null") {
      const unsubscribe = setOnlineStatus(currentUser);
      return () => unsubscribe();
    }
  }, []);

  if (lastOnline) {
    lastSeenString = formatLastSeen(lastOnline);
  }
  return (
    <>
      <nav>
        <div>
          <img
            className="back-arrow hide"
            src={BackArrow}
            alt="back arrow"
            onClick={handleClick}
          />
          <img
            className="dp"
            src={
              data.contactInfo.photoURL ? data.contactInfo.photoURL : defaultDP
            }
            alt="display picture"
          />
          <h3>{data.contactInfo.displayName}</h3>
          {isOnline && <span> online</span>}
          {lastSeenString && <span> {lastSeenString}</span>}
        </div>
      </nav>
    </>
  );
};

export default ChatNav;
