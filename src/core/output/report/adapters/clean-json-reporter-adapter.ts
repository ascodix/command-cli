import { JsonReporter } from '../json-reporter';

export class CleanJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('clean-json');
    }
}