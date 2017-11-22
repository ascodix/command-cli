import {LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel} from "typescript-logging";

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp("model.+"), LogLevel.Debug))
    .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const factory: LoggerFactory = LFService.createNamedLoggerFactory("LoggerFactory", options);