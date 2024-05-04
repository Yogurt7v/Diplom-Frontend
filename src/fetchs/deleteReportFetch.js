export const deleteReportFetch = async (id) => {
    await fetch(`http://localhost:3005/reports/${id}`, {
        method: "DELETE",
    });
}