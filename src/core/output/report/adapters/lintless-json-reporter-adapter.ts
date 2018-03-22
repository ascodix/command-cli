import { JsonReporter } from '../json-reporter';

export class LintLessJsonReporterAdapter extends JsonReporter {

    constructor() {
        super('lintless-json');
    }
}