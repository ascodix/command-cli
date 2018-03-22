import { Message } from '../message';

export class ReportMessage extends Message {

    private _line: number;

    private _col: number;

    private _fileName: string;

    private _ruleName: string;

    get line(): number {
        return this._line;
    }

    set line(value: number) {
        this._line = value;
    }

    get col(): number {
        return this._col;
    }

    set col(value: number) {
        this._col = value;
    }

    get fileName(): string {
        return this._fileName;
    }

    set fileName(value: string) {
        this._fileName = value;
    }

    get ruleName(): string {
        return this._ruleName;
    }

    set ruleName(value: string) {
        this._ruleName = value;
    }
}