import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { LintTsConfig } from './lintts-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { LintTsJsonReporterAdapter } from '../../../core/output/report/adapters/lintts-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as tslint from "tslint";

/**
 * Commande de vérification des fichiers typescript
 */
@CmdConfig({
    'dir': './application/**/*.ts',
    'options': { },
    'reporters': [{
        'name': 'lintts-json',
        'path': 'linter',
        'extensionFile': 'json'
    }]
})
export class LintTs extends Command<LintTsConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('lintts', Boolean, false, ['lt'], 'Vérifie les fichiers typescript')
        ];

        super(LintTsConfig, Constants.LINTTS_COMMAND_NAME, 'lintts', Constants.LINTTS_ALIASES, availableOptions, [LintTsJsonReporterAdapter]);

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

        const options: tslint.ILinterOptions = {
            fix: false,
            formatter: "json",
        };

        const configLoad: tslint.Configuration.IConfigurationLoadResult = tslint.Configuration.findConfiguration("tslint.json");

        // Lecture des fichiers ts
        glob(this.config.dir, (err: Error, matches: string[]) => {

            matches.map((fileName: string) => {

                // Contenu du fichier ts
                var source: string = ExternalsService.getGracefulFs().readFileSync(fileName, { encoding: "UTF-8" });

                var linter = new tslint.Linter(options);
                var resultat: tslint.LintResult = null;

                // Vérification du contenu
                linter.lint(fileName, source, configLoad.results);

                resultat = linter.getResult();

                let failures: tslint.RuleFailure[] = resultat.failures;

                // Pour chaque erreur de linter
                failures.forEach((failure: tslint.RuleFailure) => {

                    let message: ReportMessage = new ReportMessage(failure.getFailure());
                    message.type = (failure.getRuleSeverity.toString() === "error") ? EMessageType.ERROR : EMessageType.WARN;
                    let startPosition: tslint.RuleFailurePosition = failure.getStartPosition();
                    message.line = startPosition.getLineAndCharacter().line;
                    message.col = startPosition.getLineAndCharacter().character;
                    message.fileName = failure.getFileName();
                    message.ruleName = failure.getRuleName();

                    // On ajoute un ReportMessage
                    this.reportMessages.push(message);
                });

            });

            let linterJsonReporter: LintTsJsonReporterAdapter = this.getReporter(LintTsJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);
            resolve();
        });

        return promise;
    }
}