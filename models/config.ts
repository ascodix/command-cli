import {JsonObject, JsonProperty} from "json2typescript";
import {Project} from "./project";
import {ClassPath} from "./classpath";

@JsonObject
export class CliConfig {

    public static readonly CLI_CONFIG_FILE_NAME = '.mw-cli.json';

    @JsonProperty("project", Project)
    _project: Project = undefined;

    @JsonProperty("commands", [ClassPath])
    _commands: ClassPath[] = undefined

    get project(): Project {
        return this._project;
    }

    set project(value: Project) {
        this._project = value;
    }

    get commands(): ClassPath[] {
        return this._commands;
    }
}
