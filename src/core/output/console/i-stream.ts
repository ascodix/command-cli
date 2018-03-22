/**
 * Les différents flux d'entrée et de sortie
 *
 * {any} inputStream le flux d'entrée
 * {any} outputStream le flux de sortie
 * {any} errorStream le flux d'erreur
 */
export interface IStream {
    inputStream: any;
    outputStream: any;
    errorStream: any;
}