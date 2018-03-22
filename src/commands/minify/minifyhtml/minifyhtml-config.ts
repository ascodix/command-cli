﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CommandConfig } from '../../command-config';
import { MinifyHtmlConfigOptions } from './minifyhtml-options';

/**
 * Configuration pour la commande Compile-LESS
 */
@JsonObject
export class MinifyHtmlConfig extends CommandConfig {

    @JsonProperty('options')
    private _options: MinifyHtmlConfigOptions = undefined;

    get options(): MinifyHtmlConfigOptions {
        return this._options;
    }

}