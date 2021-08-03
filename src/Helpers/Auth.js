
import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../Constances/const";
export class Auth {

    enToken() {
        // console.log("BASE_URL", TOKEN_SECRET)
        const token = localStorage.getItem("token");
        // const TOKEN_SECRET = "create-token-key";
        if (!token) {
            // return "Token undifined";
            return false;
        }
        // console.log('token s',token, TOKEN_SECRET)
        const data = Jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // console.log('errr', err);
                // return { message: "Unauthorized!" };
                return false;
            }
            // console.log('data next', decoded);
            return decoded;
        });
        return data;
    }
}