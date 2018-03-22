import { Cli, ICliOptions, IEnvironment } from '../../src/cli';
import { Help } from '../../src/commands/help/help';
import { Project } from '../../src/core';
import { NotimplementedCmd } from '../fixtures/notimplementedcmd/notimplementedcmd';
import { Mocks } from '../mocks';
import { Report } from '../../src/core/report';

describe('Classe de l\'interface de commande en ligne Cli', () => {

    let cli: Cli;
    let cliOptions: ICliOptions;
    let environment: IEnvironment;
    let project: Project;
    let report: Report;

    beforeEach(() => {
        cliOptions = {
            args: [],
            basedir: '.',
            stream: Mocks.GlobalConfig().stream
        };

        cli = new Cli(cliOptions);
        project = new Project();
        report = new Report();
        environment = {
            cliArgs: cliOptions.args,
            commands: [
                new Help(),
                new NotimplementedCmd()
            ],
            project: project,
            report: report
        };
    });

    it('Instanciation de Cli', () => {
        expect(cli).toBeDefined();
    });

    it('On test si une exception est bien intercepté en générant une erreur', (done) => {
        // On ne positionne pas les variables de l'envirronnement pour générer une erreur
        let badEnvironment: IEnvironment;

        cli.run(badEnvironment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual('Cannot read property \'cliArgs\' of undefined');
            done();
        });
    });

    it('On test qu\'une erreur est bien intercepté quand il n\'y a pas de commandes disponibles', (done) => {
        // On ne positionne aucune commande pour générer une erreur
        let badEnvironment: IEnvironment = {
            cliArgs: [],
            commands: [],
            project: project,
            report: report
        };

        cli.run(badEnvironment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual('The specified command is invalid. For available options, see `gcl help`.');
            done();
        });
    });

    it('On test le lancement de Cli', (done) => {
        cli.run(environment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual(0);
            done();
        });
    });

    it('On test que quand aucune commande n\'est passé en paramètre (juste gcl), c\'est la commande help par défaut qui est lancé', (done) => {
        cli.run(environment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual(0);
            done();
        });
    });

    it('On test que quand \'gcl --help\' est passé en paramètre, c\'est la commande help qui est lancé', (done) => {
        environment.cliArgs = ['--help'];

        cli.run(environment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual(0);
            done();
        });
    });

    it('On test que quand \'gcl macommande --help\' est passé en paramètre, c\'est la commande help de la commande \'macommande\' qui est lancé', (done) => {
        environment.cliArgs = ['notimplementedcmd', '--help'];

        cli.run(environment).then(function (result: any) {
            expect(true).toBe(true);
            expect(result).toEqual(0);
            done();
        });
    });

});
