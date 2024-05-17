// import { Injectable } from "../../plugin/eioc/decorator";
import { Injectable } from "einf";
@Injectable()
// @Injectable("AppService")
export class AppService {
  ping() {
    console.log("ping");
  }
}
@Injectable()
// @Injectable("DemoService")
export class DemoService {
  add() {
    console.log("add");
  }
}
