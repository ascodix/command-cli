import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { LintLessConfig } from './lintless-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { LintLessJsonReporterAdapter } from '../../../core/output/report/adapters/lintless-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';


import * as glob from 'glob';
import * as lesshint from 'lesshint';

/**
 * Commande de vérification des fichiers html
 */
@CmdConfig({
    'dir': './application/**/*.less',
    'options': { },
    'reporters': [{
        'name': 'lintless-json',
        'path': 'linter',
        'extensionFile': 'json'
    }]
})
export class LintLess extends Command<LintLessConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('lintless', Boolean, false, ['ll'], 'Vérifie les fichiers less')
        ];

        super(LintLessConfig, Constants.LINTLESS_COMMAND_NAME, 'lintless', Constants.LINTLESS_ALIASES, availableOptions, [LintLessJsonReporterAdapter]);

        this.reportMessages = [];
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {
      
        let resolve: () => void = null;
        let reject: (erreur: Error) => void = null;
        let promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });

        var lesslint = new lesshint.Lesshint();

        lesslint.configure();

        // Lecture des fichiers less
        glob(this.config.dir, (err: Error, matches: string[]) => {

            matches.map((fileName) => {

                // Contenu du fichier less
                var fileContent: string = ExternalsService.getGracefulFs().readFileSync(fileName, { encoding: "UTF-8" });

                // Vérification du contenu
                let lintResults = lesslint.checkString(fileContent);

                // Pour chaque erreur de linter
                lintResults.forEach((lintResult: lesshint.LintResult, index: number, array: lesshint.LintResult[]) => {

                    let message: ReportMessage = new ReportMessage(lintResult.message);
                    message.type = (lintResult.severity === 'error') ? EMessageType.ERROR : EMessageType.WARN;
                    message.line = lintResult.line;
                    message.col = lintResult.column;
                    message.fileName = fileName;
                    message.ruleName = lintResult.linter;

                    // On ajoute un ReportMessage
                    this.reportMessages.push(message);
                });

            });

            let linterJsonReporter: LintLessJsonReporterAdapter = this.getReporter(LintLessJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);
            resolve();
        });

        return promise;
    }
}