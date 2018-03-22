import { IReportWriter } from './i-report-writer';

export interface IReporter extends IReportWriter {

    generate(dir: string, file: string): void;
}