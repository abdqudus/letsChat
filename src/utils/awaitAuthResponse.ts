import { store } from "../store/store";
export const waitForAuthResponse = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const { user } = store.getState();
      if (user.currentUser && !user.error) {
        unsubscribe();
        resolve(user);
      }
      if (user.error) {
        unsubscribe();

        reject(new Error(user.error));
      }
    });
  });
};
