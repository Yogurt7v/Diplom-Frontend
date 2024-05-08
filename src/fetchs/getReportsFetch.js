export const getReportsFetch = async () => {
    const response = await fetch("http://localhost:3005/reports", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    
    return data
}