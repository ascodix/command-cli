import { JsonReporter } from '../json-reporter';

export class CompileTsJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('compilets-json');
    }
}