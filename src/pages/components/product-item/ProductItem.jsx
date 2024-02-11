import style from "./ProductItem.module.css";

export const ProductItem = () => {
  return (
    <div className={style.ProductItemWrapper}>
      <div className={style.ProductImage}>
        <img src="" alt="Product" />
      </div>
      <div className={style.ProductDescription}>
        <div className={style.ProductDescriptionWrapper}>
            <h3 className={style.ProductTitle}>Title</h3>
            <div className={style.ProductQuantity}>Quantity</div>
            <div className={style.ProductPrice}>Price</div>
        </div>
        <div className={style.ProductButton}>
          <button className={style.ProductButtonBuy}>Buy</button>
            <div className={style.ProductId}> product id</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
