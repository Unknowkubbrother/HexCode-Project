import { ElysiaType} from "../index";
import { login , register , loginBySessionToken, logout} from "../controller/authentication";

export default async (router : ElysiaType) => {
    router.post("/auth/login", login);
    router.post("/auth/register", register);
    router.post("/auth/session", loginBySessionToken);
    router.post("/auth/logout", logout);
    return router
}