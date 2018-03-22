﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CommandConfig } from '../../command-config';
import { MinifyCssConfigOptions } from './minifycss-options';

/**
 * Configuration pour la commande Compile-LESS
 */
@JsonObject
export class MinifyCssConfig extends CommandConfig {

    @JsonProperty('options')
    private _options: MinifyCssConfigOptions = undefined;

    get options(): MinifyCssConfigOptions {
        return this._options;
    }

}