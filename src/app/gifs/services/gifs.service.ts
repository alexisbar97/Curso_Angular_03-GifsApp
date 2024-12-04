import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'z1uLJnNfp9Ema0YJfpWMRgXf8KfgFU1x';

  constructor() {};

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  searchTag(tag: string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    console.log(this.tagsHistory);
  }
}
