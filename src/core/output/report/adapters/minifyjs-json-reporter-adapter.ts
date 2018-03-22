import { JsonReporter } from '../json-reporter';

export class MinifyJsJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('minifyjs-json');
    }
}