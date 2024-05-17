// import { Controller, IpcHandle } from "../../plugin/eioc/decorator";
import { Controller, IpcHandle } from "einf";
import { AppService, DemoService } from "./app.service";
import { IpcEventEnum } from "./enums";
@Controller()
// @Controller('AppControl')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly demoService: DemoService
  ) {}
  @IpcHandle(IpcEventEnum.PING)
  ping() {
    return this.appService.ping();
  }
  @IpcHandle(IpcEventEnum.DEMO)
  demo() {
    return this.demoService.add();
  }
}
