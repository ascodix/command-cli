import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { LintHtmlConfig } from './linthtml-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { LintHtmlJsonReporterAdapter } from '../../../core/output/report/adapters/linthtml-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as htmlhint from 'htmlhint';

/**
 * Commande de vérification des fichiers html
 */
@CmdConfig({
    'dir': './application/**/*.html',
    'options': { },
    'reporters': [{
        'name': 'linthtml-json',
        'path': 'linter',
        'extensionFile': 'json'
    }]
})
export class LintHtml extends Command<LintHtmlConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('linthtml', Boolean, false, ['lh'], 'Vérifie les fichiers html')
        ];

        super(LintHtmlConfig, Constants.LINTHTML_COMMAND_NAME, 'linthtml', Constants.LINTHTML_ALIASES, availableOptions, [LintHtmlJsonReporterAdapter]);

        this.reportMessages = [];
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {
      
        let lintResults: htmlhint.LintResult[];

        let resolve: () => void = null;
        let reject: (erreur: Error) => void = null;
        let promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });

        // Lecture des fichiers html
        glob(this.config.dir, (err: Error, matches: string[]) => {

            matches.map((fileName) => {

                // Contenu du fichier html
                var fileContent: string = ExternalsService.getGracefulFs().readFileSync(fileName, { encoding: "UTF-8" });

                // Vérification du contenu
                lintResults = htmlhint.HTMLHint.verify(fileContent);

                // Pour chaque erreur de linter
                lintResults.forEach((lintResult: htmlhint.LintResult, index: number, array: htmlhint.LintResult[]) => {

                    let message: ReportMessage = new ReportMessage(lintResult.message);
                    //message.type = (lintResult.type === 'error') ? EMessageType.ERROR : EMessageType.WARN;
                    message.line = lintResult.line;
                    message.col = lintResult.col;
                    message.fileName = fileName;
                    message.ruleName = lintResult.rule.id;

                    // On ajoute un ReportMessage
                    this.reportMessages.push(message);
                });

            });

            let linterJsonReporter: LintHtmlJsonReporterAdapter = this.getReporter(LintHtmlJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);
            resolve();
        });

        return promise;
    }
}