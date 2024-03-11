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
import {setUser} from "../../actions";


export const ProductPage = () => {

  const product = useSelector(selectProduct);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(null);
  // const isCreating = !!useMatch(`/product`);
  const isEditing = !!useMatch(`/products/:id/edit`);
  const requestServer = useServerRequest()
  

  useLayoutEffect(() => {

    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );

    dispatch(RESET_PRODUCT_DATA);
  }, [dispatch]);

  useEffect(() => {
    // if (isCreating) {
    //   setIsLoading(false);
    //   return;
    // }
    dispatch(loadProduct(requestServer, params.id)).then((productsData) => {
      setError(productsData.error);
      setIsLoading(false);
    });
  }, [dispatch, requestServer, params.id]);

  if (isLoading) {
    return null;
  }

  const AdminProductPage = (
   isEditing ? (
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
