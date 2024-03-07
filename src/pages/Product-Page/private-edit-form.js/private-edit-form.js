import style from "./private-edit-form.module.css";
import { SpecialPanel } from "../special-panel";
import { sanitazeContent } from "../../../utils";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProductAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../hooks";

export const PrivateEditForm = ({
  className,
  product: { id, productName, image_url, description, category, price },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(image_url);
  const [productNameValue, setProductNameValue] = useState(productName);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [categoryValue, setCategoryValue] = useState(category);
  const [priceValue, setPriceValue] = useState(price);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(image_url);
    setProductNameValue(productName);
  }, [image_url, productName]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {

    const newContent = sanitazeContent(contentRef.current.innerHTML);
 
    dispatch(
      saveProductAsync(requestServer, {
        id,
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue,
        price: priceValue,
      })
    ).then(({ id }) => navigate(`/products/${id}`));
  };

  const onImageChange = ({ target }) => {
    setImageUrlValue(target.value);
  };

  const onTitleChange = ({ target }) => {
    setProductNameValue(target.value);
  };

  return (
    <div className={className}>
      <input
        value={imageUrlValue}
        placeholder="Путь к картинке"
        className="input"
        onChange={onImageChange}
      />
      <input
        value={productNameValue}
        placeholder="Заголовок"
        className="input"
        onChange={onTitleChange}
      />
      <SpecialPanel
        id={id}
        editButton={
          <div onClick={onSave}>
            <img src="" alt="save" />
          </div>
        }
      />
      <div
        className="post-text"
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {/* {content} */}
      </div>
    </div>
  );
};
