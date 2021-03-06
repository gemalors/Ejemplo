import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
id: number;
title: string;
value: string;
modified: number;
}

const ITEMS_KEY = 'my items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // agregar
  AddItem(item: Item): Promise<any>{
return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
if (items){
  items.push(item);
  return this.storage.set(ITEMS_KEY, items);
}else{
  return this.storage.set(ITEMS_KEY, [item]);
}
});
  }

// mostrar
  getItems(): Promise<Item[]>{
return this.storage.get(ITEMS_KEY);
  }

  // editar
  updateItems(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0){
        return null;
      }
      const newItems: Item[] = [];
      for (const i of items){
        if (i.id === item.id){
          newItems.push(item);
        }else{
        newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
      });
  }

  // eliminar
  deleteItems(id: number): Promise<Item>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0){
        return null;
      }
      const toKeep: Item[] = [];

      for (const i of items){
if (i.id !== id){
  toKeep.push(i);
}
}
      return this.storage.set(ITEMS_KEY, toKeep);
  });
  }
}
