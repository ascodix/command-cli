import { Context } from '../../src/core';
import { IStream } from '../../src/core/output/console';

describe('Context', () => {

    let context: Context;
    let stream: IStream;

    beforeEach(() => {
        stream = {
            inputStream: '',
                outputStream: '',
                errorStream: ''
        }
        context = new Context(stream);
    });

    it('Instanciation de la context', () => {
        expect(context).toBeDefined();
    });

    it('Récupération de l\'interface utilisateur', () => {
        expect(context.consoleWriter).toBeDefined();
    });

    it('Récupération de la console', () => {
        expect(context.consoleWriter).toBeDefined();
    });

});
