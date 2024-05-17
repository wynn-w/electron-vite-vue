import "reflect-metadata";
import { DecoratorTextEnum } from "./enums";

import type { ClassType, ModulePropsType } from "./types";

export function Controller(rootPath?: string) {
  return (target, context?: DecoratorContext): void => {
    if (rootPath) {
      Reflect.defineMetadata(DecoratorTextEnum.CONTROL, rootPath, target);
    }
    console.log(console.log("Controller", Reflect.getOwnMetadataKeys(target)));
  };
}
export function Injectable(name?: string): ClassDecorator {
  return (target): void => {
    if (name) {
      Reflect.defineMetadata(DecoratorTextEnum.SERVICE, name, target);
    }
  };
}
export function IpcInvoke(eventName: string) {
  return (target, propertyName): void => {
    Reflect.defineMetadata(
      DecoratorTextEnum.IPC_INVOKE,
      eventName,
      <Object>target,
      propertyName
    );
  };
}
export function IpcHandle(eventName: string) {
  if (!eventName) throw new Error("ipc handle name is required");
  return (target, propertyName): void => {
    Reflect.defineMetadata(
      DecoratorTextEnum.IPC_HANDLE,
      eventName,
      <Object>target,
      propertyName
    );
  };
}
export function Module(metadata: ModulePropsType) {
  return <T extends ClassType>(target: T, context?: DecoratorContext): void => {
    for (const key in metadata) {
      if (metadata.hasOwnProperty(key)) {
        const prop = metadata[key as keyof typeof metadata];
        Array.isArray(prop) && Reflect.defineMetadata(key, prop, target);
      }
    }
  };
}
