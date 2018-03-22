import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { MinifyHtmlConfig } from './minifyhtml-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { MinifyHtmlJsonReporterAdapter } from '../../../core/output/report/adapters/minifyhtml-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as path from 'path';

import * as htmlminifier from 'html-minifier';

/**
 * Commande de compilation des fichiers less
 */
@CmdConfig({
    'options': {
        'src': './_temp$/**/*.html',
        'outDir': './_temp$/'
    },
    'reporters': [{
        'name': 'minifycss-json',
        'path': 'minify',
        'extensionFile': 'json'
    }]
})


export class MinifyHtml extends Command<MinifyHtmlConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('minifycss', Boolean, false, ['mc'], 'Minifie les fichiers css')
        ];

        super(MinifyHtmlConfig, Constants.MINIFYHTML_COMMAND_NAME, 'minifycss', Constants.MINIFYHTML_ALIASES, availableOptions, [MinifyHtmlJsonReporterAdapter]);

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

        // Lecture des fichiers css
        glob(this.config.options.src, (err: Error, matches: string[]) => {

            matches.map((fileName) => {

                // Contenu du fichier css
                var input: string = ExternalsService.getGracefulFs().readFileSync(fileName, { encoding: "UTF-8" });

                // html minifiée
                var output: string = htmlminifier.minify(input);

                ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName), output, { encoding: "UTF-8" });
            });

        });

        return promise;
    }
}