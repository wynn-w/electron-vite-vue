import "reflect-metadata";

function Controller() {
  return (target) => {};
}
@Controller()
class A {
  constructor() {}
}
console.log(Reflect.getOwnMetadataKeys(A));
