import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { CompileLessConfig } from './compileless-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { CompileLessJsonReporterAdapter } from '../../../core/output/report/adapters/compileless-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as less from 'less';
import * as path from 'path';

/**
 * Commande de compilation des fichiers less
 */
@CmdConfig({
    
    'options': {
        'src': './application/**/*.less',
        'outDir': '_temp$/'
    },
    'reporters': [{
        'name': 'compileless-json',
        'path': 'compile',
        'extensionFile': 'json'
    }]
})


export class CompileLess extends Command<CompileLessConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('compileless', Boolean, false, ['lc'], 'Compile les fichiers less')
        ];

        super(CompileLessConfig, Constants.COMPILELESS_COMMAND_NAME, 'compiless', Constants.COMPILELESS_ALIASES, availableOptions, [CompileLessJsonReporterAdapter]);

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

        let options: Less.Options;

        ExternalsService.getFs().mkdirp(this.config.options.outDir).then(() => {
            console.log(`Folder ${this.config.options.outDir} created`);
        }).catch((err: any) => {
            console.error(`Error on folder creation`);
        });


        glob(this.config.options.src, (err: Error, matches: string[]) => {

            matches.forEach((fileName: string) => {

                less.render(ExternalsService.getGracefulFs().readFileSync(fileName, { encoding: "UTF-8" }), { filename: path.resolve(fileName), sourceMap: {} })
                    .then((output: Less.RenderOutput) => {
                        ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName).replace('.less', '.css'), output.css, { encoding: "UTF-8" });
                    },
                    (error: Less.RenderError) => {
                        console.log('********* ERROR **********');
                        let reportMessage: ReportMessage = new ReportMessage(error.message);
                        reportMessage.type = EMessageType.ERROR;
                        reportMessage.line = error.line;
                        reportMessage.col = error.column;
                        reportMessage.fileName = error.filename;
                        this.reportMessages.push(reportMessage);
                    });
            });

            let linterJsonReporter: CompileLessJsonReporterAdapter = this.getReporter(CompileLessJsonReporterAdapter, this.reportMessages);
            linterJsonReporter.build(this.reportMessages);
            resolve();
        });

        return promise;
    }
}