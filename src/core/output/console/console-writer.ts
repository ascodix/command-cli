import { IStream } from './i-stream';
import { IWriter, Message } from '..';
import { EMessageType } from '../e-message-type';
import chalk from 'chalk';

export class ConsoleWriter implements IWriter<Message> {

    /**
     * instance de la classe
     */
    private static instance: ConsoleWriter;

    /**
     * Le flux d'entrée et de sortie de la console
     */
    private stream: IStream;
    

    /**
     * Constructeur
     *
     * @param {IUIOptions} options - les options de la console
     */
    private constructor(stream: IStream) {
        this.stream = stream;
    }

    /**
     * Retourne l'instance de la classe
     *
     * @param {IStream} stream
     * @returns {ConsoleWriter} l'instance
     */
    public static getInstance(stream: IStream): ConsoleWriter {
        ConsoleWriter.instance = ConsoleWriter.instance || new ConsoleWriter(stream);

        return ConsoleWriter.instance;
    }

    private write(message: Message): void {
        this.stream.outputStream.write(message.content);
    }

    info(message: Message): void {
        message.type = EMessageType.INFO;
        message.content = chalk.cyan(message.content);

        this.write(message);
    }

    warn(message: Message): void {
        message.type = EMessageType.WARN;
        message.content = chalk.yellow(message.content);

        this.write(message);
    }

    debug(message: Message): void {
        message.type = EMessageType.DEBUG;
        message.content = chalk.gray(message.content);

        this.write(message);
    }

    error(message: Message): void {
        message.type = EMessageType.ERROR;
        message.content = chalk.red(message.content);

        this.write(message);
    }
}