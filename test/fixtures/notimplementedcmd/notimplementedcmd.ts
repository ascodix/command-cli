import { Command, Option } from '../../../src/commands';
import { NotimplementedCmdConfig } from './notimplementedcmd-config';
import { AbstractReporter } from '../../../src/core/output/report/abstract-reporter';

export class NotimplementedCmd extends Command<NotimplementedCmdConfig> {

    constructor() {
        let availableOptions: Option[] = [

        ];

        super(NotimplementedCmdConfig, 'notimplementedcmd', 'Commande pas implémentée', [], availableOptions, null);
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