import { Option } from './option';
import { Context, Constants } from '../core';
import { ArgumentParser } from 'argparse';
import { ExternalsService} from '../services/externals.service';
import { JsonConvert } from 'json2typescript';
import { CommandConfig } from './command-config';
import { Message } from '../core/output';
import { AbstractReporter } from '../core/output/report/abstract-reporter';
import { JsonReporter } from '../core/output/report';
import { ReporterOptions } from './reporter-options';

export abstract class Command<T extends CommandConfig> {

    protected context: Context;
    protected configFile: string;
    protected defaultConfig: object;
    protected parser: ArgumentParser;
    protected _config: T;
    protected _reporters: AbstractReporter[] = [];
    protected readonly _classConfig: new() => T;
    protected readonly _name: string;
    protected readonly _description: string;
    protected readonly _aliases: string[];
    protected readonly _availableOptions: Option[];

    constructor(classConfig: new() => T, name: string, description: string, aliases: string[], availableOptions: Option[], extraReporters: [{ new(): AbstractReporter }]) {

        let helpOption = new Option('help', String, false, Constants.HELP_ALIASES, 'Display command name and description only.');

        this._classConfig = classConfig;
        this._name = name;
        this._description = description;
        this._aliases = aliases;
        this._availableOptions = availableOptions;
        this.parser = new ArgumentParser({
            addHelp: true,
            description: this.description
        });

        this.initReporters(extraReporters);

        this.availableOptions.forEach(option => {
            this.parser.addArgument(option.aliases, {
                defaultValue: option.default,
                type: option.type,
                help: option.description
            })
        });
    }

    /**
     * Initialisation de la commande
     *
     * @param {Context} context
     * @returns {Promise<void>}
     */
    public init(context: Context): Promise<void> {
        this.context = context;
        this.initConfig();

        return Promise.resolve();
    }

    /**
     * Initialisation de la configuration
     */
    private initConfig() {
        let jsonConvert: JsonConvert = new JsonConvert();
        let configPath: string = this.context.project.root + '\\' + this.configFile;

        try {
            if(ExternalsService.getFs().existsSync(configPath)) {
                let jsonObject: object = ExternalsService.getFs().readJsonSync(configPath);
                this._config = jsonConvert.deserialize({...this.defaultConfig, ...jsonObject}, this.classConfig);
            } else {
                this._config = jsonConvert.deserialize(this.defaultConfig, this.classConfig);
            }
        } catch(e) {
            this.context.consoleWriter.error(new Message(`Error with the configuration : ${e.message} `));
        }
    }

    get classConfig(): new() => CommandConfig {
        return this._classConfig;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get aliases(): string[] {
        return this._aliases;
    }

    get availableOptions(): Option[] {
        return this._availableOptions;
    }

    get config(): T {
        return this._config;
    }

    public validateAndRun(args: string[]): Promise<any> {
        //log.info('Arguments passées à la commande help : ');
        //log.info(JSON.stringify(args));
        //log.info(JSON.stringify(this.parser));
        //this.parser.parseArgs(args);

        return new Promise(resolve => {
            resolve(this.run());
        });
    }

    public abstract beforeRun(args: string[]): Promise<any>;

    /**
     * Méthode run à implémenter par commande
     *
     * @returns {Promise<any>}
     */
    public abstract run(): Promise<any>;

    /**
     * Génération des rapports
     */
    public generateReport(): Promise<any> {
        if (this.config) {
            this.config.reporters.forEach((reporterOption: ReporterOptions) => {
                let currentReporter = this.reporters.find(reporter => reporter.name === reporterOption.name);
                if (currentReporter === undefined) {
                    this.context.consoleWriter.error(new Message(`The reporter with the name : ${reporterOption.name} does not exist`));
                }
                let dir: string = this.context.report.path + '\\' + reporterOption.path;
                let file: string = currentReporter.name.toLowerCase() + '.' + reporterOption.extensionFile;
                currentReporter.generate(dir, file);
            });
        }

        return new Promise(resolve => {
            resolve(0);
        });
    }

    /**
     * Initialisation des rapports
     */
    private initReporters(extraReporters: [{ new(): AbstractReporter }]): void {
        this.addReporter(new JsonReporter());

        if(extraReporters !== null) {
            extraReporters.forEach((reporterReference: { new(): AbstractReporter }) => {
                this.addReporter(new reporterReference());
            });
        }

        if(this.config !== undefined && this.config.reporters !== undefined) {
            this.config.reporters.forEach((reporterOption: ReporterOptions) => {
                if(this.reporters.find(reporter => reporter.name === reporterOption.name) === undefined) {
                    this.context.consoleWriter.error(new Message(`The specified reporter ${reporterOption.name} does not exist.`))
                }
            });
        }
    }

    /**
     * Ajoute un reporter à la commande
     *
     * @param {AbstractReporter} reporter
     */
    public addReporter(reporter: AbstractReporter) {
        this._reporters.push(reporter);
    }

    /**
     * Retourne le reporter qui correspond à la classe
     *
     * @param {{new(data: D): T}} ctor la classe du reporter à retourner
     * @param {D} data les données à passer au reporter
     * @returns {T} le reporter
     */
    protected getReporter<D, R extends AbstractReporter>(ctor: { new (): R }, data: D): AbstractReporter {
        let referenceClass: AbstractReporter = new ctor();
        let currentReporter: AbstractReporter = this.reporters.find(reporter => reporter.name === referenceClass.name);

        if(currentReporter === undefined) {
            // TODO : Exceptions
        }

        return currentReporter;
    }

    /**
     * Retourne l'ensemble des reporters de la commande
     *
     * @returns {AbstractReporter[]}
     */
    get reporters(): AbstractReporter[] {
        return this._reporters;
    }
}