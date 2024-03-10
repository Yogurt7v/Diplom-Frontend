import { forwardRef } from "react"; 
import styled from "./custom-input.module.css"

export const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
      <input {...props} ref={ref} className={styled.CustomInput}></input>
  );
});
