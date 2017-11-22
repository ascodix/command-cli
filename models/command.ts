import {factory} from "../utilities/configLog4j";
import {Option} from "./option";
import {IParam} from "./i-param";
import {Constants} from "./constants";
import {Argument} from "./argument";
const log = factory.getLogger("models.Command");

export abstract class Command {

    protected readonly _name: string;
    protected readonly _aliases: string[];
    protected readonly _availableOptions: Option[];
    protected _rawArgs: Argument[] = [];
    protected _params: IParam[] = [];

    constructor(name: string, aliases: string[], availableOptions: Option[]) {
        let helpOption = new Option('help', String, false, Constants.HELP_ALIASES, 'Display command name and description only.');
        availableOptions.unshift(helpOption);

        this._name = name;
        this._aliases = aliases;
        this._availableOptions = availableOptions;

    }

    get name(): string {
        return this._name;
    }

    get aliases(): string[] {
        return this._aliases;
    }

    get availableOptions(): Option[] {
        return this._availableOptions;
    }

    get params(): IParam[] {
        return this._params;
    }

    public abstract beforeRun(args: string[]): Promise<any>;

    public abstract run(params: IParam[]): Promise<any>;

    public validateAndRun(args: string[]) {

        return new Promise(resolve => {
            this.parseArgs(args);
            log.info('validateAndRun - ' + JSON.stringify(this._params));

            if (this._params && this.hasHelpOption()) {
                return resolve(Constants.CALL_HELP);
            }

            if (this._params === null) {
                return resolve();
            }

            resolve(this.run(this._params));
        });
    }

    /**
     * Découpe les arguments d'une ligne de commande en options (-opt ou --opt), et en arguments
     *
     * @param {string[]} args les arguments d'une ligne de commande
     */
    private parseArgs(args: string[]): void {

        args.forEach((arg: string) => {
            this._rawArgs.push(new Argument(arg));

            if (arg.startsWith('--') || arg.startsWith('-')) {
                arg = arg.startsWith('--') ? arg.substring(2, arg.length) : arg.substring(1, arg.length);

                let option = this.isAvailableOption(arg);

                if(option != null) {

                } else {
                    throw new Error(`The specified option ${arg} is invalid. For available options, see \`mw help\`.`);
                }
                log.info('Arg ' + arg + ' est une option');
                this.params.push(option);
            } else {
                log.info('Arg ' + arg + ' est un argument');
                this.params.push(new Argument(arg));
            }
        });
    }

    /**
     * Test si la commande a une option d'aide
     *
     * @returns {boolean} true si il y a l'option d'aide, sinon false
     */
    private hasHelpOption(): boolean {
        let param: IParam = null;

        param = this._params.find((param: IParam) => {
            if(param instanceof Option && param.name == Constants.HELP_COMMAND_NAME) {
                return true;
            }

            return false;
        });

        return (param === null) ? false: true;
    }

    /**
     * Test si l'argument passé en ligne de commande est une option valide de la commande
     *
     * @param {string} arg
     * @returns {Option}
     */
    private isAvailableOption(arg: string): Option {
        let find: Option = null;
        log.info('isAvailableOption of command ' + this.name + ' : ' + JSON.stringify(this.availableOptions));
        this.availableOptions.some((option: Option) => {
            //log.info('PARSE OPTION');
            //log.info('Arg ' + arg + ' est une option');
            if(option.aliases.includes(arg)) {
                find = option;
                return true;
            }
        });

        return find;
    }

    /**
     * Retourne la commande d'origine (sous forme de chaîne) avec ou sans l'option help
     *
     * @param {boolean} withHelp si true avec l'option help sinon sans l'option help
     * @returns {string[]} la commande d'origine
     */
    public getRawLine(withHelp: boolean = true) {
        var args: string[] = [];

        this._rawArgs.forEach((arg: Argument) => {
            let value = arg.rawValue;
            let rawValue = arg.rawValue;

            if (rawValue.startsWith('--') || rawValue.startsWith('-')) {
                value = rawValue.startsWith('--') ? rawValue.substring(2, rawValue.length) : rawValue.substring(1, rawValue.length);
            }

            if ((withHelp && Constants.HELP_ALIASES.includes(value)) || (!Constants.HELP_ALIASES.includes(value))) {
                args.push(arg.rawValue)
            }
        });

        return args;
    }
}