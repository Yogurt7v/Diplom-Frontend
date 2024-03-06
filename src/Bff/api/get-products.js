import { transformProducts } from "../transformers";

export const getProducts = (searchPhrase, page, limit) => 
fetch(`http://localhost:3004/products?&_page=${page}&_limit=${limit}`)
// fetch(`http://localhost:3004/products?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`) 
  .then((loadedProducts) => 
  Promise.all([loadedProducts.json(), loadedProducts.headers.get("Link")]),
)
  .then (([loadedProds, links]) => (
    {
    products:loadedProds && loadedProds.map(transformProducts),
    links:links,
  }
  ));


  //то что в комментариях нужно будет для получения поискового запроса