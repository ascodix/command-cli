﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CommandConfig } from '../../command-config';
import { CompileLessConfigOptions } from './compileless-options';

/**
 * Configuration pour la commande Compile-LESS
 */
@JsonObject
export class CompileLessConfig extends CommandConfig {

    @JsonProperty('options')
    private _options: CompileLessConfigOptions = undefined;

    get options(): CompileLessConfigOptions {
        return this._options;
    }

}