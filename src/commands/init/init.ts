import { Command } from '../command';
import { Option } from '../option';
import { CmdConfig } from '../class-cmd-config.decorator';
import { InitConfig } from './init-config';
import { LintHtmlJsonReporterAdapter } from '../../core/output/report/adapters/linthtml-json-reporter-adapter';
import { ReportMessage } from '../../core/output/report';

@CmdConfig({
    'property1': 'value1',
    'property2': 'value2',
    'property3': 'value3',
    'reporters': [{
        'name': 'linthtml-json',
        'path': 'linthtml',
        'extensionFile': 'json'
    }]
})
export class Init extends Command<InitConfig> {

    constructor() {

        let availableOptions: Option[] = [

        ];

        super(InitConfig, 'init', 'Initialisation de la configuration', ['i'], availableOptions, [LintHtmlJsonReporterAdapter]);
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve('Method beforeRun inside Init command not implemented.');
    }

    public run(): Promise<any> {
        let results: any = ['toto', 'titi'];
        let linterJsonReporter: LintHtmlJsonReporterAdapter = this.getReporter(LintHtmlJsonReporterAdapter, results);
        const message1: ReportMessage = new ReportMessage('test warn');
        message1.line = 1;
        message1.col = 5;
        this.getReporter(LintHtmlJsonReporterAdapter, results).warn(message1);
        this.getReporter(LintHtmlJsonReporterAdapter, results).error(new ReportMessage('test error'));

        return Promise.resolve('Method beforeRun inside Init command not implemented.');
    }
}