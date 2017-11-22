import {Command} from "../models/Command";
import {Option} from "../models/option";

import {factory} from "../utilities/configLog4j";
import {IParam} from "../models/i-param";
const log = factory.getLogger("models.New");

export class New extends Command {

    constructor() {
        let availableOptions: Option[] = [

        ];

        super('new', ['n'], availableOptions);
    }

    public beforeRun(args: string[]): Promise<any> {
        log.info('beforeRun - ARGS NEW COMMAND : ' + JSON.stringify(args));

        return Promise.resolve("Method beforeRun not implemented.");
        //throw new Error("Method beforeRun not implemented.");
    }

    public run(params: IParam[]): Promise<any> {
        log.info('run - PARAMS NEW COMMAND : ' + JSON.stringify(params));
        throw new Error("Method run not implemented.");
    }
}