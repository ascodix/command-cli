import {Command} from "./Command";

export interface IEnvironment {
    cliArgs: string[];
    commands: Command[];
}