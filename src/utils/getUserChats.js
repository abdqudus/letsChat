import { doc, getDoc } from "firebase/firestore";
import { firestoredb } from "..";

async function fetchUserData(contactId, chatDetails) {
  const docRef = doc(firestoredb, "users", contactId);
  const docSnap = await getDoc(docRef);
  const fullChatDetails = { ...chatDetails, ...docSnap.data() };
  return fullChatDetails;
}
export function getUserChats(chats) {
  let userChats = Object.entries(chats)
    ?.sort((a, b) => b[1].date - a[1].date) //this ensures the contacts are arranged in terms of latest message
    .filter((chat) => {
      // console.log(chat);
      return chat[1].lastMessage;
    }); //this ensures that the contacts rendered are only those the user has chatted with

  return Promise.all(
    userChats.map((chat) => {
      const chatDetails = {
        chatId: chat[0],
        lastMessage: chat[1].lastMessage.text,
      };
      return new Promise((resolve) =>
        resolve(fetchUserData(chat[1].userInfo.uid, chatDetails))
      );
    })
  );
}
