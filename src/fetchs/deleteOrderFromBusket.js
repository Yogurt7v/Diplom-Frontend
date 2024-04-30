export const deleteBusketOrderFetch = async (id) => {
    await fetch(`http://localhost:3005/buskets/${id}`, {
        method: "DELETE",
    });
}