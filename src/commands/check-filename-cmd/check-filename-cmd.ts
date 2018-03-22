import { Command } from '../command';
import { Option } from '../option';
import { Constants } from '../../core/constants';
import { CheckFilenameConfig } from './check-filename-config';
import { CmdConfig } from '../class-cmd-config.decorator';

import * as namelint from 'name-lint';
import { Message} from '../../core/output';
import { AbstractReporter } from '../../core/output/report/abstract-reporter';

import { LintHtmlJsonReporterAdapter } from '../../core/output/report/adapters/linthtml-json-reporter-adapter';
import { ReportMessage } from '../../core/output/report';
import { EMessageType } from '../../core/output/e-message-type';

/**
 * Commande de suppression des dossiers de génération
 */
@CmdConfig({
    'dir': './application',
    'options': {
        'dirFormat': /^[a-z0-9\\-]+$/,
        'fileFormats': {
            '.ts': /^[a-z0-9\\-]+$/,
            '.html': /^[a-z0-9\\-]+$/,
            '.less': /^[a-z0-9\\-]+$/
        },
        'exclude': [
            '**/node_modules',
            '**/build'
        ]
    },
    'reporters': [{
        'name': 'check-filename-json',
        'path': 'linter',
        'extensionFile': 'json'
    }]
})
export class CheckFilename extends Command<CheckFilenameConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('check-filename', Boolean, false, ['k'], 'Vérifie les noms de fichiers et de dossiers')
        ];

        super(CheckFilenameConfig, Constants.CHECKNAME_COMMAND_NAME, 'check-filename', Constants.CHECKNAME_ALIASES, availableOptions, [LintHtmlJsonReporterAdapter]);

        this.reportMessages = [];
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {

        this.context.consoleWriter.info(new Message('Execution de check-filename'));

        namelint(this.config.dir, this.config.options, (err: Error, matches: string[]) => {
            if (err) { throw err; }
            matches.map((file) => {

                let message: ReportMessage = new ReportMessage("Nom incorrect : " + file);
                message.type = EMessageType.ERROR;
                message.fileName = file;
                message.ruleName = "check-filename";

                // On ajoute un ReportMessage
                this.reportMessages.push(message);

                this.context.consoleWriter.error(new Message('Nom incorrect -> ' + file));
            });

            console.log(this.reportMessages);

            let linterJsonReporter: LintHtmlJsonReporterAdapter = this.getReporter(LintHtmlJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);

        });

        return Promise.resolve(0);
    }
}