import { Message } from './message';

export interface IWriter<T extends Message> {

    info(message: T): void;

    warn(message: T): void;

    debug(message: T): void;

    error(message: T): void;
}