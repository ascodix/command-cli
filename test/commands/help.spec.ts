import { Command, Help, HelpConfig } from '../../src/commands';
import { Context } from '../../src/core/context';
import { Mocks } from '../mocks';
import {Project} from "../../src/core";
import {Report} from "../../src/core/report";

describe('Commande `Help`', () => {

    let command: Command<HelpConfig>;
    let context: Context;
    let args: string[];
    let project: Project;
    let report: Report;

    beforeEach(() => {
        command = new Help();
        project = new Project();
        context = new Context(Mocks.GlobalConfig().stream);
        context.init(project, report);
        args = [];
    });

    it('Instanciation de la commande', () => {
        expect(command.name).toEqual('help');
        expect(command.aliases).toEqual(['help', 'h']);
        expect(command.description).toEqual('Aide');
    });

    it('Options de la commande', () => {
        expect(command.availableOptions.length).toEqual(1);
    });

    it('Initialisation de la commande', (done) => {
        command.init(context).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

    it('Pré-lancement de la commande', (done) => {
        command.beforeRun(args).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

    it('Validation et le lancement de la commande', (done) => {
        command.validateAndRun(args).then(function () {
            expect(true).toBe(true);
            done();
        });
    });

});
