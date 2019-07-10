import { Part } from './part';
import { Band } from './band';

export class Score {
    constructor(
        public id: number,
        public title: string,
        public from: string,
        public by: string,
        public created: Date,
        public favorite: boolean,
        public comment: string,
        public tag: string,
        public tags: string[],
        public parts: Part[],
        public band: Band,
        public note: number
    ) {}
}
