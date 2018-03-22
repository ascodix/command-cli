import { JsonReporter } from '../json-reporter';

export class MinifyCssJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('minifycss-json');
    }
}