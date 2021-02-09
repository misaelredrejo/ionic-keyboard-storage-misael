import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { KeyboarddbService } from '../core/keyboarddbservice.service';
import { IKeyboard } from '../shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  public keyboard: IKeyboard;
  keyboardForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private keyboarddbService: KeyboarddbService,
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
    this.id = this.activatedrouter.snapshot.params.id;
    this.keyboarddbService.getItem(this.id).then(
      (data: IKeyboard) => {
        this.keyboard = data;

        this.keyboardForm = new FormGroup({
          name: new FormControl(this.keyboard.name),
          category: new FormControl(this.keyboard.category),
          price: new FormControl(this.keyboard.price),
          cover: new FormControl(this.keyboard.cover),
          description: new FormControl(this.keyboard.description),
        });
      });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar teclado',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.keyboarddbService.remove(this.id);
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
    this.keyboard.id = this.id;
    this.keyboarddbService.setItem(this.id, this.keyboard);
    console.warn(this.keyboardForm.value);
  }

}
