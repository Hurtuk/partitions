import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {

    // Observable string sources
    private errorHandledSource = new Subject<string>();

    // Observable string streams
    errorHandled$ = this.errorHandledSource.asObservable();

    // Service message commands
    declareError(errorMessage: string) {
        this.errorHandledSource.next(errorMessage);
    }
}
