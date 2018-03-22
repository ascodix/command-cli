import { AbstractReporter } from './abstract-reporter';
import { ReportMessage } from './report-message';
import { EMessageType } from '../e-message-type';
import { ExternalsService } from '../../../services';

export class JsonReporter extends AbstractReporter {

    constructor(name = 'json') {
        super(name);
    }

    info(message: ReportMessage): void {
        message.type = EMessageType.INFO
        this.messages.push(message);
    }

    warn(message: ReportMessage): void {
        message.type = EMessageType.WARN
        this.messages.push(message);
    }

    debug(message: ReportMessage): void {
        message.type = EMessageType.DEBUG
        this.messages.push(message);
    }

    error(message: ReportMessage): void {
        message.type = EMessageType.ERROR
        this.messages.push(message);
    }

    build(messages: ReportMessage[]): void {
        this.messages = messages;
    }

    generate(dir: string, file: string): void {
        ExternalsService.getFs().mkdirp(dir).then(() => {
            ExternalsService.getFs().writeJson(dir + '\\' + file, this.messages).then(() => {
                console.log('success json created!')
            }).catch((err: any) => {
                console.error(err)
            });
        }).catch((err: any) => {
            console.error(err)
        });
    }
}