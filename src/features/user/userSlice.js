import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    active: true,
    src: "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg",
    username: "rashmika.piyush143",
    email: "piyush.vaviya27@gmail.com",
    isLogin: true,
  },
  {
    active: true,
    src: "https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg",
    username: "kiara.yagnesh7446",
    email: "yasanghani7446@gmail.com",
    isLogin: "",
  },
  {
    active: false,
    src: "",
    // src: "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
    username: "jacqueline.fernandez45",
  },
  {
    active: true,
    //  src :"https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
    src: "https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg",
    username: "mia.malkova69",
    // selected: true,
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userInformation = action.payload;
      const isUserExist = state.findIndex(
        ({ email }) => userInformation.email === email
      );
      if (isUserExist === -1) {
        return [...state, { ...userInformation }];
      }
      state[isUserExist].isLogin = true;
    },

    setLoginFalse: (state, action) => {
      const isUerLoginIndex = state.findIndex(
        ({ isLogin }) => isLogin === true
      );

      state[isUerLoginIndex].isLogin = false;
    },
  },
});

export const { addUser, setLoginFalse } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
