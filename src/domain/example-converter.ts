import { injectable } from "inversify";

@injectable()
export default class ExampleConverter {
    convert(something: any) {
        return "converting...";
    }
}