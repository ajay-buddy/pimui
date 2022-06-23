import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  myProfileSelector,
  getMyProfileRequest,
} from "../app/dashboardSlice/index";

export default function Home() {
  const myProfile = useSelector(myProfileSelector);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMyProfileRequest());
  // }, []);

  return <div>Dashboard</div>;
}
