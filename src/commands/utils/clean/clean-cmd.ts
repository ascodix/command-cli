import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { CleanConfig } from './clean-config';
import { CmdConfig } from '../../class-cmd-config.decorator';

import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import { Message } from '../../../core/output';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { CleanJsonReporterAdapter } from '../../../core/output/report/adapters/clean-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

/**
 * Commande de suppression des dossiers de génération
 */
@CmdConfig({
    'foldersToClean': ['./__nicole'],
    'reporters': [{
        'name': 'clean-json',
        'path': 'utils',
        'extensionFile': 'json'
    }]
})
export class Clean extends Command<CleanConfig> {

    constructor() {
        let availableOptions: Option[] = [
            new Option('clean', Boolean, false, ['c'], 'Vide les dossiers de génération')
        ];

        super(CleanConfig, Constants.CLEAN_COMMAND_NAME, 'Clean', Constants.CLEAN_ALIASES, availableOptions, [CleanJsonReporterAdapter]);
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {
        this.config.foldersToClean.map((folder: string) => {
            rimraf(folder, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                mkdirp(folder, (error) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    this.context.consoleWriter.info(new Message(`${folder} cleaned`));
                });

            });
        });

        return Promise.resolve(0);
    }
}