export const addReportFetch = async (report) => {
    await fetch("http://localhost:3005/reports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(report)
    });
}