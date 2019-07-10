import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    public bandsMenu = [
        { pathArg: 'winds', title: 'Orchestre à vents' },
        { pathArg: 'strings', title: 'Orchestre à cordes' },
        { pathArg: 'chamber', title: 'Chambre' },
        { pathArg: 'duets', title: 'Duo' },
        { pathArg: '', title: 'Autres / Chercher' }
    ];

}
