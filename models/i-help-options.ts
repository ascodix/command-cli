import {IEnvironment} from "./i-environment";
import {Command} from "./command";

export interface IHelpOptions {
    environment: IEnvironment;
    command: Command;
}