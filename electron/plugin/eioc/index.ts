import { app, ipcMain } from "electron";
import { DecoratorTextEnum } from "./enums";
import { Options } from "./types";

/**
 * Create and initialize Einf app
 */
export async function createEioc({ controllers, injects = [] }: Options) {
  const ExistInjectableMap = new Map<string, any>();

  await app.whenReady();
  // init controllers
  for (const ctlor of controllers) {
    const controller = factory(ctlor);
    const proto = controller.prototype;
    console.log(Reflect.getMetadataKeys(ctlor.prototype.constructor));
    // const funcs = Object.getOwnPropertyNames(proto).filter(
    //   (item) => typeof controller[item] === "function" && item !== "constructor"
    // );

    // funcs.forEach((fnName: string) => {
    //   console.log(fnName, Reflect.getMetadata(DecoratorTextEnum.IPC_HANDLE, proto, fnName))
    //   if (Reflect.getMetadata(DecoratorTextEnum.IPC_HANDLE, proto, fnName)) {
    //     const event = Reflect.getMetadata(
    //       DecoratorTextEnum.IPC_HANDLE,
    //       proto,
    //       fnName
    //     );
    //     ipcMain.handle(event, async (e, ...args) => {
    //       try {
    //         return await controller[fnName].apply(controller, [...args, e]);
    //       } catch (error: any) {
    //         throw new Error(error?.message ?? error);
    //       }
    //     });
    //   }
    // });
  }

  function factory(constructor: any) {
    console.log("constructor", constructor);
    const paramtypes = Reflect.getMetadata("design:paramtypes", constructor);
    let services: any[] = [];
    if (paramtypes) {
      services = paramtypes?.map((service: any) => {
        const name = Reflect.getOwnMetadata(DecoratorTextEnum.SERVICE, service);
        if (!ExistInjectableMap.has(name)) {
          ExistInjectableMap.set(name, service);
        }
        const item = ExistInjectableMap.get(name);
        // const item = ExistInjectable[name] || factory(service);
        // ExistInjectable[name] = item;
        return item;
      });
    }
    return new constructor(...services);
  }
}
