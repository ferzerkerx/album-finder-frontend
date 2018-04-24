import { Artist } from './Artist';

export class Album {
  title: string;
  year: string;
  id?: number;
  artist?: Artist;

  constructor(param?: { year: string; title: string; artist: Artist; id: number | undefined }) {
    if (param) {
      this.year = param.year;
      this.title = param.title;
      this.artist = param.artist;
      this.id = param.id;
    }
  }

  get isExisting():boolean {
    return this.id && this.id > 0;
  }

  get isNew():boolean {
    return !this.isExisting;
  }
}
