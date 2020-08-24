import { Component, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import {Platform, ToastController, List} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
items: Item[] = [];
newItem: Item = <Item>{};

@ViewChild('mylist')mylist: List;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  //agregar
  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.AddItem(this.newItem).then(item => {
      this.newItem = <Item> {};
      this.showToast('Item added')
      this.loadItems();
    });
  }

  //mostrar
  loadItems(){
    this.storageService.getItems().then(items => {
      this.items = this.items;
    })
  }

  //editar
  updateItem(item: Item){
  item.title = 'UPDATE: ${item.title}';
  item.modified = Date.now();
  this.storageService.updateItems(item).then(item => {
    this.showToast('Item updated');
    this.mylist.closeSlidingItems();
    this.loadItems();
  });
  }

  //eliminar
  deleteItem(item: Item){
    this.storageService.deleteItems(item.id).then(item => {
      this.showToast('Item removed');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  // helper
  async showToast(msg){
 const toast = await this.toastController.create({
 message: msg,
 duration: 2000
 });
 toast.present();
  }

}
