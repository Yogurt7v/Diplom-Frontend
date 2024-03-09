import { sessions } from "../sessions";
import { getUser } from "../api/get-user";
import { addUser } from "../api/add-user";




export const register = async (regLogin, regPassword, address,homeNumber, flatNumber, phone) => {
    const existedUser = await getUser(regLogin);

    if (existedUser) {
      return {
        error: "Такой пользователь уже существует",
        res: null,
      };
      
    }

    const user = await addUser(regLogin, regPassword, address,homeNumber, flatNumber, phone);
  
    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        location:{
          address: user.address,
          homeNumber: user.homeNumber,
          flatNumber: user.flatNumber,
        },
        phone: user.phone,
        roleId: user.role_id,
        session: sessions.create(user),
        card: null,
      },
    };
  }