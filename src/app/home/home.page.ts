import { Component, OnInit } from '@angular/core';
import { IKeyboard } from '../shared/interfaces';
import { KeyboardcrudService } from '../core/keyboardcrud.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public keyboards: IKeyboard[];
  //keyboardsinit: IKeyboard[];

  constructor(private keyboardcrudService: KeyboardcrudService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.keyboardcrudService.read_Keyboards().subscribe(data => {
      this.keyboards = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          category: e.payload.doc.data()['category'],
          price: e.payload.doc.data()['price'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.keyboards);
    });
    //this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.keyboards !== undefined) {
      this.keyboards.splice(0);
    }
    this.retrieveValues();
  }
  /*inicialization() {
    if (this.keyboardcrudService.empty()) {
      this.keyboardsinit.forEach(keyboard => {
        this.keyboardcrudService.setItem(keyboard.id, keyboard);
      });
    }
  }*/
  retrieveValues() {
    // Retrieve values
    this.keyboardcrudService.read_Keyboards().subscribe(data => {
      this.keyboards = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          category: e.payload.doc.data()['category'],
          price: e.payload.doc.data()['price'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.keyboards);
    });
  }
  keyboardTapped(keyboard) {
    this.route.navigate(['details', keyboard.id]);
  }
}