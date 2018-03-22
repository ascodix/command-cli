import { Command, Option } from '../../../src/commands';
import { GoodCmdConfig } from './goodcommand-config';
import { AbstractReporter } from '../../../src/core/output/report/abstract-reporter';

export class GoodCmd extends Command<GoodCmdConfig> {

    constructor() {
        let availableOptions: Option[] = [
            new Option('opt1', Boolean, false, ['opt1'], 'description de l\'option 1'),
            new Option('opt2', Boolean, false, ['opt2'], 'description de l\'option 2')
        ];

        super(GoodCmdConfig, 'goodcommand', 'Commande de test correct', [], availableOptions, null);
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve('Method beforeRun inside Notimplementedcmd command not implemented.');
    }

    public run(): Promise<any> {
        return Promise.resolve('Method beforeRun inside Notimplementedcmd command not implemented.');
    }

    protected registerReporters(): AbstractReporter[] {
        return [];
    }
}