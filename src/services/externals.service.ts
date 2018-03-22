import * as fs from 'fs-extra';
import * as gracefulfs from 'graceful-fs';

/**
 * Classe permettant d'importer les librairies extérieures
 */ 
export class ExternalsService {

    private static fs: any = null;
    private static gracefulfs: any = null;
    private static module: (file: string) => Promise<any> = null;
    
    public static getFs() {
        return (ExternalsService.fs === null) ? fs : ExternalsService.fs ;
    }

    public static setFs(fs: any) {
        ExternalsService.fs = fs;
    }

    public static getGracefulFs() {
        return (ExternalsService.gracefulfs === null) ? gracefulfs : ExternalsService.gracefulfs;
    }

    public static setGracefulFs(gracefulfs: any) {
        ExternalsService.gracefulfs = gracefulfs;
    }


    public static setGetModule(getmodule: (file: string) => Promise<any>) {
        ExternalsService.module = getmodule;
    }

    public static getModule(file: string): Promise<any> {
        return (ExternalsService.module === null) ? import(file): ExternalsService.module(file);
    }
}