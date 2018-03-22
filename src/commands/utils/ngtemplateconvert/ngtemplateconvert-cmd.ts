import { Command } from '../../command';
import { Option } from '../../option';
import { Constants } from '../../../core/constants';
import { NgTemplateConvertConfig } from './ngtemplateconvert-config';
import { CmdConfig } from '../../class-cmd-config.decorator';

import { Message } from '../../../core/output';
import { AbstractReporter } from '../../../core/output/report/abstract-reporter';
import { NgTemplateConvertJsonReporterAdapter } from '../../../core/output/report/adapters/ngtemplateconvert-json-reporter-adapter';
import { ReportMessage } from '../../../core/output/report';
import { EMessageType } from '../../../core/output/e-message-type';

//import * as templatecache from 'templatecache';

/**
 * Commande de templating angular des vues html
 */
@CmdConfig({
    'entries': ['./_temp$/**/*.html'],
    'reporters': [{
        'name': 'clean-json',
        'path': 'utils',
        'extensionFile': 'json'
    }]
})
export class NgTemplateConvert extends Command<NgTemplateConvertConfig> {

    constructor() {
        let availableOptions: Option[] = [
            new Option('ngtemplateconvert', Boolean, false, ['tc'], 'Convertit les vues html en templates angular')
        ];

        super(NgTemplateConvertConfig, Constants.NGTEMPLATECONVERT_COMMAND_NAME, 'ngTemplateConvert', Constants.NGTEMPLATECONVERT_ALIASES, availableOptions, [NgTemplateConvertJsonReporterAdapter]);
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

        /*templatecache({
            angularRoot: '_temp$',
            moduleName: 'templates',
            isStandalone: false,
            isNgAnnotate: false,
            isCreateOutput: true,
            templatesFilePath: 'templates.js'
        }, (err: any, templatejs: any) => {
                // Reporting error
        });*/

        return promise;
    }
}