
export const addProduct = ({ productName, image_url, description, category, price }) =>
  fetch("http://localhost:3004/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      productName,
      image_url,
      description,
      category,
      price,
    }),
  }).then((createdPost) => createdPost.json());

