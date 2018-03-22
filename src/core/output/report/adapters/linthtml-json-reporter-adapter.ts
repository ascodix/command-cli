import { JsonReporter } from '../json-reporter';

export class LintHtmlJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('linthtml-json');
    }
}