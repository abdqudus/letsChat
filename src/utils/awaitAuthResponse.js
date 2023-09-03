import { store } from "../store/store";
console.log(store);
export const waitForAuthResponse = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const { user } = store.getState();
      console.log(user);
      if (user.currentUser && !user.error) {
        unsubscribe();
        resolve(user);
      }
      if (user.error) {
        console.log(user.error);
        unsubscribe();

        reject(new Error(user.error));
      }
    });
  });
};
