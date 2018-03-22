import { IReporter } from './i-reporter';
import { ReportMessage } from './report-message';

export abstract class AbstractReporter implements IReporter {

    private _name: string;

    private _path: string;

    private _extensionFile: string;

    private _messages: ReportMessage[] = [];

    abstract info(message: ReportMessage): void;

    abstract warn(message: ReportMessage): void;

    abstract debug(message: ReportMessage): void;

    abstract error(message: ReportMessage): void;

    abstract build(messages: ReportMessage[]): void;

    abstract generate(dir: string, file: string): void;


    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }

    get extensionFile(): string {
        return this._extensionFile;
    }

    get messages(): ReportMessage[] {
        return this._messages;
    }

    set messages(messages: ReportMessage[]) {
        this._messages = messages;
    }

}