import { forwardRef } from "react";

// export const CustomInput = ({
//     value, placeholder, onChange
// }, ref) => {
//     return (
//         <input
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         ref={ref}
//         />
//     );
// }

export const CustomInput = forwardRef(({ ...props }, ref) => {
    return (
        <input {...props} ref={ref}></input>
    );
  });
  