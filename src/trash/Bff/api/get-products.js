import { transformProducts } from "../transformers";

export const getProducts = (searchPhrase, searchCategory) => 
fetch(`http://localhost:3004/products?ingredients_like=${searchPhrase}&category_like=${searchCategory}`) 
  .then((loadedProducts) => 
  Promise.all([loadedProducts.json(), loadedProducts.headers.get("Link")]),
)
  .then (([loadedProds, links]) => (
    {
    products:loadedProds && loadedProds.map(transformProducts),
    links:links,
  }
  ))

  //то что в комментариях нужно будет для получения поискового запроса
// тут получают link если захочется вернуть пагинацию, если нет, потом убрать