export class Part {
    public instrumentNumber: number;
    public instrumentsCount: number;
    public editingFile: File;

    public constructor(
        public instrumentTag: string,
        public instrumentName: string) {}
}
