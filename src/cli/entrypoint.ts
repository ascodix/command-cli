import { Cli, IEnvironment, ICliOptions, CliConfig } from '.';
import { JsonConvert } from 'json2typescript';
import { ClassPath, Project } from '../core';
import { Command, CommandConfig, Help, Init } from '../commands';
import { ExternalsService } from '../services/externals.service';
import { ConsoleWriter, Message } from '../core/output';

/**
 * Point d'entrée de l'application
 * 
 * @param {ICliOptions} les options reçu de la console
 */
export default function entrypoint(options: ICliOptions): Promise<any> {
    let jsonConvert: JsonConvert = new JsonConvert();
    let cli = new Cli(options);
    let config: CliConfig;
    let project: Project;

    let initCommand: Init = new Init();
    let helpCommand: Help = new Help();

    return ExternalsService.getFs().readJson('./.generic-cli.json').then((jsonObject: any) => {
        config = jsonConvert.deserialize(jsonObject, CliConfig);
        let commands: Command<CommandConfig>[] = [];

        //return getCommands(config.commands);
        return commands;
    }).then((commands: Command<CommandConfig>[]) => {

        // On ajoute la commande help comme première en plus des commandes chargées
        commands.unshift(helpCommand);
        commands.push(initCommand);

        // On ajoute le chemin courant au projet
        project = config.project;
        project.root = options.basedir;

        let environment: IEnvironment = {
            cliArgs: options.args,
            commands: commands,
            project: project,
            report: config.report
        };
        return cli.run(environment);
        }).catch((error: Error) => {
            console.log(error);
        ConsoleWriter.getInstance(options.stream).error(new Message(`Unable to find '.generic-cli.json' file in ${options.basedir} !.`));
    });
}

/**
 * Importation et instantiation des commandes
 *
 * @param {ClassPath[]} classPathes les paramètres (nom et path) des commandes à intégrer
 * @returns {Promise<Command[]>} une promesse de commandes
 */
function getCommands(classPathes: ClassPath[]): Promise<Command<CommandConfig>[]> {
    let promiseArr: Promise<Command<CommandConfig>>[] = classPathes.map(function (classPath) {

        return ExternalsService.getModule(classPath.path).then(function (module) {
            let clazz: { new(): Command<CommandConfig> } = module[classPath.className];
            let command: Command<CommandConfig> = new clazz();
            return command;
        })
    });

    return Promise.all(promiseArr);
}
