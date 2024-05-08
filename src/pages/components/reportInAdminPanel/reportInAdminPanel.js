import style from "./reportInAdminPanel.module.css";

export const Reports = ({ users, reports, deleteReport }) => {
  return (
    <>
      {reports?.map((report) => (
        <div className={style.AdminReportsWrapper} key={report._id}>
          <div className={style.ReportWrapper}>
            <div className={style.ReportTitle}>
              Login: {users.find(({ id }) => id === report.userId).login}
            </div>
            <div className={style.ReportText}>Жалоба: {report.text}</div>
            <button
              className={style.ReportDelete}
              onClick={() => deleteReport(report._id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
