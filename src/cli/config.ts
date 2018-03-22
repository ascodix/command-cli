import { JsonObject, JsonProperty } from 'json2typescript';
import { Project } from '../core/project';
import { Report } from '../core/report';

@JsonObject
export class CliConfig {

    public static readonly CLI_CONFIG_FILE_NAME = '.generic-cli.json';

    @JsonProperty('project', Project)
    private _project: Project = undefined;

    @JsonProperty('report', Report)
    private _report: Report = undefined;

    get project(): Project {
        return this._project;
    }

    get report(): Report {
        return this._report;
    }

    set report(report: Report) {
        this._report = report;
    }
}