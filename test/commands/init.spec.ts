import { Command, Init, InitConfig } from '../../src/commands';
import { Context } from '../../src/core/context';
import { Project } from '../../src/core';
import { Mocks } from '../mocks';
import {Report} from "../../src/core/report";

describe('Commande `Init`', () => {

    let command: Command<InitConfig>;
    let context: Context;
    let args: string[];
    let project: Project;
    let report: Report;

    beforeEach(() => {
        command = new Init();
        project = new Project();
        context = new Context(Mocks.GlobalConfig().stream);
        context.init(project, report);
        args = [];
    });

    it('Instanciation de la commande', () => {
        expect(command.name).toEqual('init');
        expect(command.aliases).toEqual(['i']);
        expect(command.description).toEqual('Initialisation de la configuration');
    });

    it('Options de la commande', () => {
        expect(command.availableOptions.length).toEqual(0);
    });

    it('Initialisation de la commande', (done) => {
        command.init(context).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

    it('Pré-lancement de la commande `Init`', (done) => {
        command.beforeRun(args).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

    it('Validation et le lancement de la commande `Init`', (done) => {
        command.validateAndRun(args).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

});
