import { Project } from './project';
import { ConsoleWriter, IStream } from './output/console';
import { Report } from './report';

import * as process from 'child_process';

export class Context {

    private _project: Project;

    private _stream: IStream;

    private _report: Report;

    private _process: any;

    private _consoleWriter: ConsoleWriter;

    constructor(stream: IStream) {
        this._stream = stream;
        this._process = this.process;
    }

    public init(project: Project, report: Report) {
        this._project = project;
        this._report = report;
    }

    get consoleWriter() {
        return ConsoleWriter.getInstance(this._stream);
    }

    get project(): Project {
        return this._project;
    }

    get report(): Report {
        return this._report;
    }

    get process(): any {
        return this._process;
    }
}