import { server } from "../Bff";
import { useSelector } from "react-redux";
import { selectUserSession } from "../selectors";
import { useCallback } from "react";



export const useServerRequest = () => {

  const session = useSelector(selectUserSession);

  return useCallback(
    (operation, ...params) => {
      const request = [
        "register",
        "authorize",
        "fetchProducts",
        "fetchProduct",
        "saveProduct",
      ].includes(operation)
        ? params
        : [session, ...params];
      return server[operation](...request);
    },
    [session]
  );
};
