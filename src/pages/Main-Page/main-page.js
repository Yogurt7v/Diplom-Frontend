import style from "./main-page.module.css";
import React from "react";
import Content from "../components/content/content.js";
import SearchBar from "../components/search-bar/search-bar.js";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { VideoBackground } from "../components"



export const MainPage = () => {

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
  }, [dispatch]);  

  return (
    <>
      <div className={style.AppWrapper}>
        <SearchBar />
        <Content />
        <VideoBackground/>
      </div>
    </>
  );
}


