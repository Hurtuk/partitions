import { Injectable } from '@angular/core';

@Injectable()
export class BrowserService {

    constructor() { }

    public isIE(): boolean {
        return !!(<any>document).documentMode;
    }
}
