import { JsonReporter } from '../json-reporter';

export class CompileLessJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('compileless-json');
    }
}