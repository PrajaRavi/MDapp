import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  _id:string,
  role?:string,
  phoneNumber: string;
  profilePicture: string | null;
  
}
export type OrderProductType={
  Address:String;
  phoneNumber?:Number;
  AltphoneNumber?:Number;
  lat?:Number|string|undefined;
  lang?:Number|string|undefined;
  Items:ItemType[];
  User:User;
  Amount?:Number
  Count?:Number
  paymentStatus:String;
  Time:{from:String,to:String};
  Day:String;
  orderStatus:String;
  _id:String;

  
}
type ProductPickUpType={
  from:String;
  to:String;
}
type ItemType={
  id:string;
  name:string;
  price:Number;
  count:Number;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  Orders:OrderProductType[]|null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  Orders:null,
};

const UserSlice = createSlice({
  name: "User",

  initialState,

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;

      
    },

    logout: (state) => {
      state.isLoggedIn = false;

      state.user = null;

      state.token = null;
    },
    setUser: (state,action) => {
      state.user = action.payload;
    },
    setOrders: (state,action) => {
      state.Orders = action.payload;
    },
      

      
  },
});

export const {
  login,
  logout,
  setUser,
  setOrders
} = UserSlice.actions;

export default UserSlice.reducer;