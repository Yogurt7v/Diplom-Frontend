import style from "./report-page.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { addReportFetch } from "../../fetchs";

export const ReportPage = () => {
  const user = useSelector((state) => state.user);
  const [reporText, setReportText] = useState("");
  const userName = user.login.charAt(0).toUpperCase() + user.login.slice(1);
  const navigate = useNavigate();
  const ref = useRef(null);

  const report = () => {
    if (!reporText) {
      return;
    }
    const report = {
      userId: user.id,
      text: reporText,
    };
    addReportFetch(report);
    ref.current.value = "";
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className={style.ReportPageWrapper}>
        <div className={style.ReportText}>Report Page</div>
        <div className={style.ReportTextUser}>Добрый день, {userName}.</div>
        <div className={style.ReportTextUser}>Что Вас не устроило?</div>
        <textarea
          className={style.ReportTextarea}
          onChange={(e) => setReportText(e.target.value)}
          ref={ref}
        ></textarea>
        <button onClick={() => report()} className={style.ReportButton}>
          Отправить
        </button>
      </div>
    </div>
  );
};
