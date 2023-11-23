import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteItems = signal<any>([]);
  private localStorageKey = 'favoriteList'

  constructor() {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData !== null) {
      const dataFromLocal = JSON.parse(storedData);

      this.favoriteItems.set(dataFromLocal)
    }
  }

  getFavoriteItems(): any[] {
    return this.favoriteItems();
  }

  toggleFavorite(product: any) {
    // const index = this.favoriteItems().indexOf(product);
    const foundedInFavorite = this.favoriteItems().some( (items: any) => items['name'] === product?.name );
    // const additionalCondition1 = this.favoriteItems().filter((vendor: any) => vendor.name === product?.name);

    if (!foundedInFavorite) {
      this.favoriteItems.mutate(items => items.push(product));
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteItems()));
    } else {
      const data = this.favoriteItems().filter((vendor: any) => vendor.name !== product?.name);

      this.favoriteItems.set(data)
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteItems()));
    }
  }
}




// private favoriteItems: any[] = [];

// getFavoriteItems(): any[] {
//   return this.favoriteItems;
// }

// toggleFavorite(item: any) {
//   const index = this.favoriteItems.indexOf(item);
//   if (index === -1) {
//     this.favoriteItems.push(item);
//   } else {
//     this.favoriteItems.splice(index, 1);
//   }
// }