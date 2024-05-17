import { createEioc } from "../../plugin/eioc";
import { AppController } from "./app.control";
export async function regEiocInstance() {
  createEioc({
    controllers: [AppController],
  });
}

// import { createEinf } from "einf";
// export async function bootstrap() {}
