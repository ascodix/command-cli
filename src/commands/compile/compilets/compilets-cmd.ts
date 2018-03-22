import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { CompileTsConfig } from './compilets-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { CompileTsJsonReporterAdapter } from '../../../core/output/report/adapters/compilets-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as ts from "typescript";
import * as path from 'path';

/**
 * Commande de compilation des fichiers typescript
 */
@CmdConfig({
    'dir': './application/**/*.ts',
    'options': {},
    'reporters': [{
        'name': 'compilets-json',
        'path': 'compile',
        'extensionFile': 'json'
    }]
})


export class CompileTs extends Command<CompileTsConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('compilets', Boolean, false, ['ts'], 'Compile les fichiers typescript')
        ];

        super(CompileTsConfig, Constants.COMPILETS_COMMAND_NAME, 'compilets', Constants.COMPILETS_ALIASES, availableOptions, [CompileTsJsonReporterAdapter]);

        this.reportMessages = [];

    }

    /**
     * @description Read tsconfig file
     * @param configFileName Path to the config file
     */
    private readConfigFile(configFileName: string): ts.ParsedCommandLine {

        const configFileText: string = ExternalsService.getGracefulFs().readFileSync(configFileName, { encoding: "UTF-8" });

        // Parse JSON, after removing comments. Just fancier JSON.parse
        const result = ts.parseConfigFileTextToJson(configFileName, configFileText);
        const configObject = result.config;

        if (!configObject) {
            //reportDiagnostics([result.error]);
            process.exit(1);;
        }

        // Extract config infromation
        const configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, path.dirname(configFileName));
        if (configParseResult.errors.length > 0) {
            //reportDiagnostics(configParseResult.errors);
            process.exit(1);
        }
        return configParseResult;
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

        // Lecture du fichier de configuration
        let configFile: ts.ParsedCommandLine = this.readConfigFile('tsconfig.json');

        configFile.options.noEmitOnError = false;
        configFile.options.outFile = '_temp$/bundle.js';

        glob(this.config.dir, (err: Error, matches: string[]) => {

            let program: ts.Program = ts.createProgram(matches, configFile.options);
            let emitResult: ts.EmitResult = program.emit();

            let allDiagnostics: ts.Diagnostic[] = emitResult.diagnostics.concat(ts.getPreEmitDiagnostics(program));

            allDiagnostics.forEach((diagnostic: ts.Diagnostic) => {

                let errMessage: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

                let reportMessage: ReportMessage = new ReportMessage(errMessage);

                if (diagnostic.file) {
                    reportMessage.type = (diagnostic.category.toString() === "1") ? EMessageType.ERROR : EMessageType.WARN;
                    let startPosition: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                    reportMessage.line = startPosition.line + 1;
                    reportMessage.col = startPosition.character + 1;
                    reportMessage.fileName = diagnostic.file.fileName;
                    reportMessage.ruleName = diagnostic.code.toString();
                    console.log(`${diagnostic.file.fileName} (${reportMessage.line},${reportMessage.col}): ${errMessage}`);
                }
                else {
                    console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
                }

                // On ajoute un ReportMessage
                this.reportMessages.push(reportMessage);
            });

            let exitCode = emitResult.emitSkipped ? 1 : 0;
            console.log(`Process exiting with code '${exitCode}'.`);
            //process.exit(exitCode);

            let linterJsonReporter: CompileTsJsonReporterAdapter = this.getReporter(CompileTsJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);
            resolve();
        });

        return promise;
    }
}