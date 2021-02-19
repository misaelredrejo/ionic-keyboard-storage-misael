import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeyboardcrudService } from '../core/keyboardcrud.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IKeyboard } from '../shared/interfaces';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  keyboard: IKeyboard;
  keyboardForm: FormGroup;
  constructor(
    private router: Router,
    private keyboardcrudService: KeyboardcrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.keyboardForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar teclado',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveKeyboard();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveKeyboard() {
    this.keyboard = this.keyboardForm.value;
    let nextKey = this.keyboard.name.trim();
    this.keyboard.id = nextKey;
    this.keyboardcrudService.create_Keyboard(this.keyboard);
    console.warn(this.keyboardForm.value);
  }
}
