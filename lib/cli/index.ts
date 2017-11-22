import {Cli} from "../../models/cli";
import {IEnvironment} from "../../models/i-environment";
import {IOptions} from "../../models/i-options";
import {New} from "../../commands/new";
import {Help} from "../../commands/help";

export function cli(options: IOptions): Promise<any> {
    let cli = new Cli();

    let environment: IEnvironment = {
        cliArgs: options.cliArgs,
        commands: [
            new Help(),
            new New()
        ]
    };

    return cli.run(environment);
}