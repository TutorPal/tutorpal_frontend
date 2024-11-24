import { atom } from "recoil";

export const userProfileState = atom<[string, number, boolean] | []>({
    key: 'userProfileState',
    default: [],
});