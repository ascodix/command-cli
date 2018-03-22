import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { MinifyJsConfig } from './minifyjs-config';
import { CmdConfig } from '../../class-cmd-config.decorator';
import { Message } from '../../../core/output';
import { ExternalsService } from '../../../services/externals.service';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { MinifyJsJsonReporterAdapter } from '../../../core/output/report/adapters/minifyjs-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

import * as glob from 'glob';
import * as path from 'path';

import * as UglifyJS  from 'uglify-js';

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


export class MinifyJs extends Command<MinifyJsConfig> {

    reportMessages: ReportMessage[];

    constructor() {
        let availableOptions: Option[] = [
            new Option('minifyjs', Boolean, false, ['mj'], 'Minifie les fichiers js')
        ];

        super(MinifyJsConfig, Constants.MINIFYJS_COMMAND_NAME, 'minifycss', Constants.MINIFYJS_ALIASES, availableOptions, [MinifyJsJsonReporterAdapter]);

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

                // js minifié
                var output: UglifyJS.MinifyOutput = UglifyJS.minify(input);

                ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName), output.code, { encoding: "UTF-8" });
                ExternalsService.getGracefulFs().writeFileSync(this.config.options.outDir + path.basename(fileName).replace('.js', '.map.js'), output.map, { encoding: "UTF-8" });

            });

        });

        return promise;
    }
}