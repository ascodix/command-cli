import {Command} from "../models/Command";
import {Option} from "../models/option";

import {factory} from "../utilities/configLog4j";
import {IParam} from "../models/i-param";
import {Constants} from "../models/constants";
const log = factory.getLogger("models.Help");

export class Help extends Command {

    constructor() {
        let availableOptions: Option[] = [
            new Option('short', Boolean, false, ['s'], 'Display command name and description only.')
        ];

        super(Constants.HELP_COMMAND_NAME, Constants.HELP_ALIASES, availableOptions);
    }

    public beforeRun(args: string[]): Promise<any> {
        log.info('beforeRun - ARGS HELP COMMAND : ' + JSON.stringify(args));

        throw new Error("Method beforeRun not implemented.");
    }

    public run(params: IParam[]): Promise<any> {
        log.info('run - PARAMS HELP COMMAND : ' + JSON.stringify(params));
        throw new Error("Method run not implemented.");
    }
}