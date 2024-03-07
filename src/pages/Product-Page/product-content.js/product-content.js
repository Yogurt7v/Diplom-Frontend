import style from "./product-content.module.css";
import { useNavigate } from "react-router-dom";
import  {SpecialPanel} from "../special-panel/special-panel"
import editButton from "../../../icons/editButon.svg"


export const ProductContent =({
    product: {  id, productName, image_url, description, category, price }
})=>{

    const navigate = useNavigate();

    return (
        <div className={style.ProductWrapper}>
          <div className={style.ProductInfo}>
          <img src={image_url} alt={productName} className={style.ProductImage}></img>
          <h2 className={style.ProductTitle}>{productName}</h2>
          <SpecialPanel
            id={id}
            editButton={
              <div onClick={() => navigate(`/products/${id}/edit`)}>
                <img src={editButton} alt="edit" className={style.EditButton}/>
              </div>
            }
          />
          <div className={style.ProductDescription}>{description}</div>
          </div>
        </div>
      );


}

