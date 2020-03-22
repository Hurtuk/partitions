import { Injectable } from '@angular/core';

@Injectable()
export class UrlBuilderService {

    //private urlPrefix = 'http://www.louiecinephile.fr/partitionsServer/api/';
    //public scoresPath = 'http://www.louiecinephile.fr/partitionsServer/scores';

    private urlPrefix = '/partitionsServer/api/';
    public scoresPath = '/partitionsServer/scores';

    public buildUrl(request: string, ...args: any[]): string {
        return this.urlPrefix + this.replaceContent(
            request + '.php?' + args.map((arg, index) =>
                                'arg' + index + (arg ? '={' + index + '}' : '=')).join('&'),
            args);
    }

    public genericUrl(relative: string): string {
        return this.urlPrefix + relative;
    }

    private replaceContent(source: string, args: any[]) {
        return source.replace(/{(\d+)}/g,
                            (match, number) =>
                                typeof args[number] !== 'undefined'
                                    ? '' + args[number]
                                    : match);
    }
}
