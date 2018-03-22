import { ConsoleWriter, IStream } from '../../../../src/core/output/console';
import { Mocks } from '../../../mocks';
import { Message } from "../../../../src/core/output";

describe('ConsoleWriter', () => {
    
    let consoleWriter: ConsoleWriter = null;
    let data: string;

    let stream: IStream = Mocks.GlobalConfig().stream;

    beforeEach(() => {
        consoleWriter = ConsoleWriter.getInstance(stream);
        data = 'data a ecrire';
    });

    it('On récupère une instance de ConsoleWriter', () => {
        expect(consoleWriter).toBeDefined();
    });

    it('Ecrire une chaîne dans la console avec un niveau `INFO`', () => {
        spyOn(stream.outputStream, 'write');
        consoleWriter.info(new Message(data));
        expect(stream.outputStream.write).toHaveBeenCalledWith(data);
    });

    it('Ecrire une chaîne dans la console avec un niveau `WARN`', () => {
        spyOn(stream.outputStream, 'write');
        consoleWriter.warn(new Message(data));
        expect(stream.outputStream.write).toHaveBeenCalledWith(data);
    });

    it('Ecrire une chaîne dans la console avec un niveau `DEBUG`', () => {
        spyOn(stream.outputStream, 'write');
        consoleWriter.debug(new Message(data));
        expect(stream.outputStream.write).toHaveBeenCalledWith(data);
    });

    it('Ecrire une chaîne dans la console avec un niveau `ERROR`', () => {
        spyOn(stream.outputStream, 'write');
        consoleWriter.error(new Message(data));
        expect(stream.outputStream.write).toHaveBeenCalledWith(data);
    });

});
