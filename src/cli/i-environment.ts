import { Command, CommandConfig } from '../commands';
import { Project } from '../core';
import { Report } from '../core/report';

export interface IEnvironment {
    cliArgs: string[];
    commands: Command<CommandConfig>[];
    project: Project;
    report: Report;
}