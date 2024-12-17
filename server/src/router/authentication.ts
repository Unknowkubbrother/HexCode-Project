import { ElysiaType} from "../index";
import { login , register } from "../controller/authentication";

export default async (router : ElysiaType) => {
    router.post("/auth/login", login);
    router.post("/auth/register", register);
    return router
}