import { Command } from '../command';
import { Option } from '../option';
import { Constants } from '../../core/constants';
import { CmdConfig } from '../class-cmd-config.decorator';
import { HelpConfig } from './help-config';
import {CleanConfig} from "../utils/clean/clean-config";
import {AbstractReporter} from "../../core/output/report/abstract-reporter";

/**
 * Commande d'aide
 */
@CmdConfig({
    "property1": "value1"
})
export class Help extends Command<HelpConfig> {

    constructor() {
        let availableOptions: Option[] = [
            new Option('help', Boolean, false, ['s'], 'Display command name and description only.')
        ];

        super(HelpConfig, Constants.HELP_COMMAND_NAME, 'Aide', Constants.HELP_ALIASES, availableOptions, null);
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {
        return Promise.resolve('Method beforeRun inside Help command not implemented.');
    }
}