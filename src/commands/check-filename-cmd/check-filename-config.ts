﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CheckFilenameOptions } from './check-filename-options';
import { CommandConfig } from '../command-config';

/**
 * Configuration pour la commande Check-Filename
 */
@JsonObject
export class CheckFilenameConfig extends CommandConfig {

    @JsonProperty('dir', String)
    private _dir: string = undefined;

    @JsonProperty('options')
    private _options: CheckFilenameOptions = undefined;


    get dir(): string {
        return this._dir;
    }

    get options(): CheckFilenameOptions {
        return this._options;
    }
}