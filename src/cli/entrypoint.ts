import { Cli, IEnvironment, ICliOptions, CliConfig } from '.';
import { JsonConvert } from 'json2typescript';
import { ClassPath, Project } from '../core';
import { Command, CommandConfig, Help, Init, Clean, CheckFilename } from '../commands';
import { ExternalsService } from '../services/externals.service';
import { ConsoleWriter, Message } from '../core/output';
import { LintHtml } from '../commands/lint/linthtml/linthtml-cmd';
import { LintLess } from '../commands/lint/lintless/lintless-cmd';
import { LintTs } from '../commands/lint/lintts/lintts-cmd';
import { CompileLess } from '../commands/compile/compileless/compileless-cmd';
import { CompileTs } from '../commands/compile/compilets/compilets-cmd';
import { MinifyJs } from '../commands/minify/minifyjs/minifyjs-cmd';
import { MinifyCss } from '../commands/minify/minifycss/minifycss-cmd';
import { MinifyHtml } from '../commands/minify/minifyhtml/minifyhtml-cmd';
import { ReplaceTokens } from '../commands/utils/tokens/replacetokens';
import { NgTemplateConvert } from '../commands/utils/ngtemplateconvert/ngtemplateconvert-cmd';

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
    let cleanCommand: Clean = new Clean();
    let checkFilename: CheckFilename = new CheckFilename();
    let lintHtml: LintHtml = new LintHtml();
    let lintLess: LintLess = new LintLess();
    let lintTs: LintTs = new LintTs();
    let compileLess: CompileLess = new CompileLess();
    let compileTs: CompileTs = new CompileTs();
    let minifyJs: MinifyJs = new MinifyJs();
    let minifyCss: MinifyCss = new MinifyCss();
    let minifyHtml: MinifyHtml = new MinifyHtml();
    let replaceTokens: ReplaceTokens = new ReplaceTokens();
    let ngtemplateconvert: NgTemplateConvert = new NgTemplateConvert();

    return ExternalsService.getFs().readJson('./.mw-cli.json').then((jsonObject: any) => {
        config = jsonConvert.deserialize(jsonObject, CliConfig);
        let commands: Command<CommandConfig>[] = [];

        //return getCommands(config.commands);
        return commands;
    }).then((commands: Command<CommandConfig>[]) => {

        // On ajoute la commande help comme première en plus des commandes chargées
        commands.unshift(helpCommand);
        commands.push(initCommand);
        commands.push(cleanCommand);
        commands.push(checkFilename);
        commands.push(lintHtml);
        commands.push(lintLess);
        commands.push(lintTs);
        commands.push(compileLess);
        commands.push(compileTs);
        commands.push(minifyJs);
        commands.push(minifyCss);
        commands.push(minifyHtml);
        commands.push(replaceTokens);
        commands.push(ngtemplateconvert);

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
        ConsoleWriter.getInstance(options.stream).error(new Message(`Unable to find '.mw-cli.json' file in ${options.basedir} !.`));
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
