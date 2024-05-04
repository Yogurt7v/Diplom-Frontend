import style from "./product-page.module.css";
import { useDispatch } from "react-redux";
import { useParams, useMatch } from "react-router-dom";
import { useLayoutEffect, useEffect, useState } from "react";
import { RESET_PRODUCT_DATA, setUser } from "../../actions";
import { ROLE } from "../../constants/role.js";
import { ProductContent } from "./product-content.js";
import { PrivateProductContent } from "./private-product-content";
import { PrivateEditForm } from "./private-edit-form.js";
import { Header } from "../components";
import { getSingleProduct } from "../../fetchs";
import SkeletonProductCard  from "../components/skeleton/SkeletonProductCard";

export const ProductPage = () => {
  const [sinlgeProduct, setSinlgeProduct] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isEditing = !!useMatch(`/products/:id/edit`);

  useLayoutEffect(() => {
    const currentUserDataJSON = localStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
    dispatch(RESET_PRODUCT_DATA);
  }, []);

  useEffect(() => {
    getSingleProduct(params.id).then((productsData) => {
      setSinlgeProduct(productsData);
      setError(productsData?.error);
      setIsLoading(false);
    });
  }, [params.id]);

  const AdminProductPage = isEditing ? (
    <>
      <Header />
      {isLoading ? (
        <SkeletonProductCard />
      ) : (
        <PrivateProductContent access={[ROLE.ADMIN]} serverError={error}>
          <PrivateEditForm product={sinlgeProduct} />
        </PrivateProductContent>
      )}
    </>
  ) : (
    <>
      <Header />
      {isLoading ? (
        <SkeletonProductCard />
      ) : (
        <div className={style.ProductAndCommentsWrapper}>
          <ProductContent product={sinlgeProduct} />
        </div>
      )}
    </>
  );

  return error ? (
    <>
      <Header />
      <div className={style.error}>{error}</div>
    </>
  ) : (
    AdminProductPage
  );
};

export default ProductPage;
