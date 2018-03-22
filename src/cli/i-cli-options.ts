import {IStream} from "../core/output/console";

/**
 * Options de la console
 *
 * {string[]} args les arguments passés à la console
 * {string} basedir le répertoire courant
 * {IStream} stream les différents flux d'entrée et de sortie
 */
export interface ICliOptions {
    args: string[];
    basedir: string;
    stream: IStream;
}