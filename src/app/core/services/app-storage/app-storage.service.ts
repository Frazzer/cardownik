import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


export interface Card {
  id: number,
  shopName: string,
  shopLocalization: string,
  modified: number
}

const CARD_KEY = 'my_cards';


@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value).then(value => { return value });
  }

  public async get(key: string): Promise<any> {
    const data = await this._storage?.get(key).then(value => { return value });
    return data;
  }

  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key).then(value => { return value });
  }

  public async clear(): Promise<void> {
    await this._storage?.clear().then(value => { return value });
  }

  public async keys(): Promise<void> {
    await this._storage?.keys().then(value => { return value });
  }

}
