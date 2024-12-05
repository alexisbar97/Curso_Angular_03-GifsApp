import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'z1uLJnNfp9Ema0YJfpWMRgXf8KfgFU1x';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  };

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
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }
  };

  private loadLocalStorage(): void {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('history')){
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    }

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  };

  async searchTag(tag: string): Promise<void> {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)
    ;

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=z1uLJnNfp9Ema0YJfpWMRgXf8KfgFU1x&q=Valorant&limit=10')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data))

    // Equivalente

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp => {
        this.gifList = resp.data;
    });

  }
}
