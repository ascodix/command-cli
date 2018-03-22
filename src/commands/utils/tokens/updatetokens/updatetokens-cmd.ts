import { Command } from '../../../command';
import { Option } from '../../../option';
import { Constants } from '../../../../core/constants';
import { UpdateTokenConfig } from './updatetokens-config';
import { CmdConfig } from '../../../class-cmd-config.decorator';
import { Message } from '../../../../core/output';
import { ExternalsService } from '../../../../services/externals.service';
import { AbstractReporter } from '../../../../core/output/report/abstract-reporter';

import * as glob from 'glob';

/**
 * Commande de remplacement de tokens
 */
@CmdConfig({
    'dir': '.',
    'options': {}
})
export class UpdateTokens extends Command<UpdateTokenConfig> {

    

    constructor() {

        let TOKEN_REGEXP_PREFIX = "##";
        let TOKEN_REGEXP_SUFFIX = "##";

        let availableOptions: Option[] = [
            new Option('updatetokens', Boolean, false, ['rt'], 'Met à jour les tokens')
        ];

        super(UpdateTokenConfig, Constants.LINTTS_COMMAND_NAME, 'lintts', Constants.LINTTS_ALIASES, availableOptions, null);
    }
    

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {

        

        return Promise.resolve(0);
    }
}