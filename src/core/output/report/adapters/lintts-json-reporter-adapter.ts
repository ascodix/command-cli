import { JsonReporter } from '../json-reporter';

export class LintTsJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('lintts-json');
    }
}