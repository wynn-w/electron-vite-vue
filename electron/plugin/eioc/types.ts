import { requestTypeList } from "./constants";

export type ClassType<T = any> = new (...args: any) => T;
type Construct<T = any> = new (...args: Array<any>) => T;
export type ControllerClass = Construct;
export type InjectableClass = Construct;
export interface InjectableOpts {
  name: string;
  inject: any;
}

export type Options = {
  /**
   * Automatically initialized controller
   */
  controllers: ControllerClass[];
  /**
   * Custom injectable items
   */
  injects?: InjectableOpts[];
};
export type RequestType = (typeof requestTypeList)[number];
export type ModulePropsType = {
  controllers?: any[];
  providers?: any[];
  injects?: any[];
  imports?: any[];
};
