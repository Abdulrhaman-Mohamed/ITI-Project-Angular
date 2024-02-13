export class PageEvent {
  constructor(
    public first: number,
    public rows: number,
    public page: number,
    public pageCount: number
  ) {}
}
