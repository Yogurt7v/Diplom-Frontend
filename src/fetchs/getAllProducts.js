export const getAllProducts = async (searchPhrase, searchCategory) => {
    if (!searchPhrase && !searchCategory) {
        const response = await fetch("http://localhost:3005/getProducts");
        const res = await response.json();
        console.log("getAllProducts", res);
        return res;
    }

    // const response = await fetch("http://localhost:3005/getProducts");
    // const res = await response.json();
    // console.log("getAllProducts", res);
    // return res;
}