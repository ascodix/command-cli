﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CommandConfig } from '../../command-config';
import { MinifyJsConfigOptions } from './minifyjs-options';

/**
 * Configuration pour la commande MinifyJS
 */
@JsonObject
export class MinifyJsConfig extends CommandConfig {

    @JsonProperty('options')
    private _options: MinifyJsConfigOptions = undefined;

    get options(): MinifyJsConfigOptions {
        return this._options;
    }

}