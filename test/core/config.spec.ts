import { CliConfig } from '../../src/cli';
import { Project } from '../../src/core';
import { JsonConvert } from "json2typescript";

describe('CliConfig', () => {

    let config: CliConfig;
    let project: Project;
    let jsonConvert: JsonConvert;
    let json: {};

    beforeEach(() => {
        jsonConvert = new JsonConvert();
        json = {
            "project": {
                "name": "test mw-cli"
            },
            "report": {
                "path": "report"
            }
        };
        config = jsonConvert.deserialize(json, CliConfig);
        project = new Project();
    });

    it('Instanciation de la configuration', () => {
        expect(config).toBeDefined();
        expect(config.project.name).toEqual('test mw-cli');
    });

});
