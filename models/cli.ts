import {IEnvironment} from "./i-environment";

import {factory} from "../utilities/configLog4j";
import {Command} from "./command";
import {IHelpOptions} from "./i-help-options";
import {Constants} from "./constants";
const log = factory.getLogger("models.Cli");

export class Cli {

    constructor() {

    }

    run(environment: IEnvironment): Promise<any> {
        log.info("Debug CLI run");

        return Promise.resolve().then(() => {

            let args = environment.cliArgs;

            if (args.length === 0) {
                args[0] = 'help';
            }

            if (args[0] === '--help') {
                if (args.length === 1) {
                    args[0] = 'help';
                } else {
                    args.shift();
                    args.push('--help');
                }
            }

            let commandName = args.shift();
            let commandArgs = args;
            let command = environment.commands.find((command: Command ) => command.name == commandName);

            if(command == null) {
                throw new Error(`The specified command ${commandName} is invalid. For available options, see \`mw help\`.`);
            }

            let runPromise = Promise.resolve().then(() => {
                return command.beforeRun(commandArgs);
            }).then(() => {
                log.info("Appel de validateAndRun");
                return command.validateAndRun(commandArgs);
            }).then(result => {
                if (result === Constants.CALL_HELP) {
                    log.info("Appel de callHelp");
                    return this.callHelp({
                        environment: environment,
                        command: command
                    });
                }
            });

            return runPromise;
        });
    }

    /**
     * En cas d'option avec aide, supprime l'argument aide et rajoute le nom de la commande comme argument
     *
     * @param {IHelpOptions} options
     * @returns {Promise<any>}
     */
    callHelp(options: IHelpOptions) {
        let environment: IEnvironment = options.environment;
        let commandName: string = options.command.name;
        let commandArgs: string[] = [];

        let helpCommand = environment.commands.find((command: Command )  => command.name == Constants.HELP_COMMAND_NAME);

        commandArgs = options.command.getRawLine(false).filter((arg: string) => Constants.HELP_ALIASES.indexOf(arg) == -1);

        commandArgs.unshift(commandName);

        return helpCommand.validateAndRun(commandArgs);
    }
}