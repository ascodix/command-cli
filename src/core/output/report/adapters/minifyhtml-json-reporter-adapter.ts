import { JsonReporter } from '../json-reporter';

export class MinifyHtmlJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('minifyhtml-json');
    }
}