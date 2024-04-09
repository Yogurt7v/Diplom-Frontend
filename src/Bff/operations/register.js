import { sessions } from "../sessions";
import { addUser } from "../api/add-user";




export const register = async (regLogin, regPassword, address,homeNumber, flatNumber, phone) => {

    const user = await addUser(regLogin, regPassword, address,homeNumber, flatNumber, phone);
  
    return {
      error: null,
      res: {
        login: user.login,
        location:{
          address: user.address,
          homeNumber: user.homeNumber,
          flatNumber: user.flatNumber,
        },
        phone: user.phone,
        role_id: user.role_id,
        session: sessions.create(user),
        card: null,
      },
    };
  }