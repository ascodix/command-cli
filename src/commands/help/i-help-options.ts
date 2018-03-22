import { IEnvironment } from "../../cli/i-environment";
import { Command } from "../command";
import { CommandConfig } from "../command-config";

export interface IHelpOptions {
    environment: IEnvironment;
    command: Command<CommandConfig>;
}