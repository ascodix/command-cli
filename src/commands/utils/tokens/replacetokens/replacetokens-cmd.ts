import { Command } from '../../../command';
import { Option } from '../../../option';
import { Constants } from '../../../../core/constants';
import { ReplaceTokensConfig } from './replacetokens-config';
import { CmdConfig } from '../../../class-cmd-config.decorator';
import { ExternalsService } from '../../../../services/externals.service';
import { AbstractReporter } from '../../../../core/output/report/abstract-reporter';
import { ReplaceTokensJsonReporterAdapter } from '../../../../core/output/report/adapters/replacetokens-json-reporter-adapter';
import { ReportMessage } from '../../../../core/output/report';
import { EMessageType } from '../../../../core/output/e-message-type';
import { ReplaceTokensOptions, TokensFile } from './replacetokens-options';

import * as glob from 'glob';
import * as http from 'http';
import * as replace from 'replace';

/**
 * Commande de remplacement de tokens
 */
@CmdConfig({
    'dir': ['_temp$'],
    'options': {
        'tokenFiles': [
            {
                'file': 'myway-dua.par',
                'order': 1
            },
            {
                'file': 'myway-dua-local.par',
                'order': 0
            },
            {
                'url': 'http://myway-dua.sigcesie.caisse-epargne.fr:6080/v18.09/myway-dua.par',
                'order': 2
            }
        ]
    },
    'reporters': [{
        'name': 'replacetokens-json',
        'path': 'utils',
        'extensionFile': 'json'
    }]
})
export class ReplaceTokens extends Command<ReplaceTokensConfig> {

    private static TOKEN_REGEXP_PREFIX: string;
    private static TOKEN_REGEXP_SUFFIX: string;

    tokens: { [key: string]: string };

    constructor() {

        let availableOptions: Option[] = [
            new Option('replacetokens', Boolean, false, ['rt'], 'Remplace les tokens')
        ];

        super(ReplaceTokensConfig, Constants.REPLACETOKENS_COMMAND_NAME, 'replacetokens', Constants.REPLACETOKENS_ALIASES, availableOptions, [ReplaceTokensJsonReporterAdapter]);

        ReplaceTokens.TOKEN_REGEXP_PREFIX = "##";
        ReplaceTokens.TOKEN_REGEXP_SUFFIX = "##";
    }

    /**
     * Remplace les tokens des fichiers situés dans les répertoires à scanner
     * @param tokens    Fichier des tokens
     * @param prefix    Préfixe du token
     * @param suffix    Suffixe du token
     * @param paths     Répertoires à scanner
     */
    private replaceTokens(tokens: string, prefix: string, suffix: string, paths: string[] ) {

        tokens.split("\n").forEach((line: string) => {

            if ((line.length > 0) && line.substring(0, 1) !== ';') {
                const keyValue = line.split('=');

                replace({
                    regex: prefix + keyValue[0] + suffix,
                    replacement: keyValue[1],
                    paths: paths,
                    silent: false,
                    recursive: true
                });
            }
        });
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

        // lecture de l'ensemble des fichiers .par, avec une priorité > 0 et dans l'ordre des priorités
        this.config.options.tokenFiles.filter(token => token.order > 0).sort((a, b) => { return a.order - b.order }).forEach((tokensFile: TokensFile) => {

            if (tokensFile.file) {
                var tokens: string = ExternalsService.getGracefulFs().readFileSync(tokensFile.file, { encoding: "UTF-8" });
                this.replaceTokens(tokens, ReplaceTokens.TOKEN_REGEXP_PREFIX, ReplaceTokens.TOKEN_REGEXP_SUFFIX, this.config.dir);
            };

            if (tokensFile.url) {
                http.get(tokensFile.url, (response) => {
                    response.on('data', (tokens) => {
                        this.replaceTokens(tokens.toString(), ReplaceTokens.TOKEN_REGEXP_PREFIX, ReplaceTokens.TOKEN_REGEXP_SUFFIX, this.config.dir);
                    });
                });
            }

        });

        return promise;
    }
}