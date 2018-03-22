import {Cli} from "../../models/cli";
import {IEnvironment} from "../../models/i-environment";
import {IOptions} from "../../models/i-options";
//import {New} from "../../commands/new";
//import {Help} from "../../commands/help";
import * as loadJsonFile from "load-json-file";
import {JsonConvert} from "json2typescript";
import {CliConfig} from "../../models/config";
import {factory} from "../../utilities/configLog4j";
import {Command} from "../../models/command";
import {ClassPath} from "../../models/classpath";

const log = factory.getLogger("lib/cli/index");

export function cli(options: IOptions): Promise<any> {
    let cli = new Cli();
    let jsonConvert: JsonConvert = new JsonConvert();
    let json = loadJsonFile.sync('./.genric-cli.json');
    let config: CliConfig = jsonConvert.deserialize(json, CliConfig);

    let commands: Command[] = [
        //new Help(),
        //new New()
    ];

    return getCommands(config.commands).then((coms: Command[]) => {
        commands = commands.concat(coms);

        return commands;
    }).then((commands: Command[]) => {

        let environment: IEnvironment = {
            cliArgs: options.cliArgs,
            commands: commands
        };
        return cli.run(environment);
    })
}

async function getCommands(classPathes: ClassPath[]): Promise<Command[]> {
    let commands: Command[] = [];

    for (let classPath of classPathes) {
        const mod: any = await import(classPath.path);
        let clazz: {new(): Command} = mod[classPath.className];
        let command: Command = new clazz();

        if(!(command instanceof Command)) {
            throw new Error(`The specified class ${classPath.className} must extend Command class, see \`mw help\`.`);
        }
        log.info('COM : ' + JSON.stringify(command));
        commands.push(command);
    }

    return commands;
}
