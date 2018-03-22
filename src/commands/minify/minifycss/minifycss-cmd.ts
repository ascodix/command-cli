import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { MinifyCssConfig } from './minifycss-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { MinifyCssJsonReporterAdapter } from '../../../core/output/report/adapters/minifycss-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as path from 'path';

import * as cleancss from 'clean-css';

/**
 * Commande de compilation des fichiers less
 */
@CmdConfig({
    'options': {
        'src': './application/**/*.less',
        'outDir': './_temp$/**/*.css'
    },
    'reporters': [{
        'name': 'minifycss-json',
        'path': 'minify',
        'extensionFile': 'json'
    }]
})


export class MinifyCss extends Command<MinifyCssConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('minifycss', Boolean, false, ['mc'], 'Minifie les fichiers css')
        ];

        super(MinifyCssConfig, Constants.MINIFYCSS_COMMAND_NAME, 'minifycss', Constants.MINIFYCSS_ALIASES, availableOptions, [MinifyCssJsonReporterAdapter]);

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

                // css minifiée
                var output: cleancss.Output = new cleancss().minify(input);

                ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName), output.styles, { encoding: "UTF-8" });
                ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName).replace('.css', '.map.css'), output.sourceMap, { encoding: "UTF-8" });

            });

        });

        return promise;
    }
}