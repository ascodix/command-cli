import { IWriter } from '../i-writer';
import { ReportMessage } from './report-message';

export interface IReportWriter extends IWriter<ReportMessage> {}