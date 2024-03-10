import style from "./product-page.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../../selectors";
import { useServerRequest } from "../../hooks";
import { useParams, useMatch } from "react-router-dom";
import { useState } from "react";
import { useLayoutEffect, useEffect } from "react";
import { loadProduct, RESET_PRODUCT_DATA } from "../../actions";
import { ROLE } from "../../constants/role.js";
import  {ProductContent} from "./product-content.js"
import {PrivateProductContent} from "./private-product-content"
import {PrivateEditForm} from "./private-edit-form.js"


export const ProductPage = () => {

  const product = useSelector(selectProduct);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(null);
  const isCreating = !!useMatch(`/products`);
  const isEditing = !!useMatch(`/products/:id/edit`);
  const requestServer = useServerRequest()
  

  useLayoutEffect(() => {
    dispatch(RESET_PRODUCT_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    dispatch(loadProduct(requestServer, params.id)).then((productsData) => {
      setError(productsData.error);
      setIsLoading(false);
    });
  }, [dispatch, requestServer, params.id, isCreating]);

  if (isLoading) {
    return null;
  }

  console.log("ProductPage", product);

  const AdminProductPage = (
    isCreating || isEditing ? (
      <PrivateProductContent access={[ROLE.ADMIN]} serverError={error}>
          <PrivateEditForm product={product} />
     </PrivateProductContent>
    ) : (
      <div className={style.ProductAndCommentsWrapper}>
        <ProductContent product={product} />
      </div>
    )
  )

    return error ? <div className={style.error}>{error}</div> : AdminProductPage;

};

export default ProductPage;
