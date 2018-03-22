import { IEnvironment, ICliOptions } from '.';
import { Command, CommandConfig } from '../commands';
import { Context } from '../core';
import { Message } from '../core/output';

/**
 * Classe de l'interface de commande en ligne'
 * 
 */
export class Cli {

    private context: Context;

    /**
     * Constructeur
     *
     * @param {ICliOptions} cliOptions les options recu par le point d'entrée'
     */
    constructor(cliOptions: ICliOptions) {
        this.context = new Context(cliOptions.stream)
    }

    run(environment: IEnvironment): Promise<any> {
        return Promise.resolve().then(() => {
            let args = environment.cliArgs;

            // Si aucune commande n'est passé en paramètre on positionne la commande help par défaut de mw
            if (args.length === 0) {
                args[0] = 'help';
            }

            // Si le paramètre 'help' est passé en paramètre on positionne la commande help par défaut de mw
            // Sinon si le paramètre 'help' est passé en paramètre en plus d'une commadne on lance la commande help de la commande
            if (args[0] === '--help' || args[0] === '-help' || args[0] === '--h' || args[0] === '-h') {
                if (args.length === 1) {
                    args[0] = 'help';
                } else {
                    args.shift();
                    args.push('--help');
                }
            }

            // On récupère la commande
            let commandName = args.shift();
            let command: Command<CommandConfig> = environment.commands.find((command: Command<CommandConfig>) => command.name == commandName);

            if (command == null) {
                let message: Message = new Message(`The specified command is invalid. For available options, see \`gc help\`.`);
                this.context.consoleWriter.error(message);
                throw new Error(message.content);
            }

            this.context.init(environment.project, environment.report);

            // Initialisation de la commande
            command.init(this.context);

            let runPromise = Promise.resolve().then(() => {
                return command.beforeRun(args);
            }).then(() => {
                return command.validateAndRun(args);
            }).then(() => {
                return command.generateReport();
            }).then(result => {
                return result;
            });

            return runPromise;

        }).catch((error) => {
            return error.message;
        });
    }

    /**
     * En cas d'option avec aide, supprime l'argument aide et rajoute le nom de la commande comme argument
     *
     * @param {IHelpOptions} options
     * @returns {Promise<any>}
     */
    /*callHelp(options: IHelpOptions) {
        let environment: IEnvironment = options.environment;
        let commandName: string = options.command.name;
        let commandArgs: string[] = [];

        let helpCommand = environment.commands.find((command: Command )  => command.name == Constants.HELP_COMMAND_NAME);

        commandArgs = options.command.getRawLine(false).filter((arg: string) => Constants.HELP_ALIASES.indexOf(arg) == -1);

        commandArgs.unshift(commandName);

        return helpCommand.validateAndRun(commandArgs);
    }*/
}