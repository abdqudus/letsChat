import { RootState } from "../store";

export const selectCurrentWindowSize = (state: RootState) => state.screenSize;
