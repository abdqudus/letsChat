const handleSelect = (contactInfo) => {
  const chatId =
    currentUser.uid > contactInfo.uid
      ? currentUser.uid + contactInfo.uid
      : contactInfo.uid + currentUser.uid;
  dispatch(selectContact({ contactInfo, chatId }));
};
