import { ElysiaType} from "../index";
import authentication from "./authentication";

export default async (router : ElysiaType) => {
    authentication(router);
    return router
}