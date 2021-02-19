import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { KeyboardcrudService } from '../core/keyboardcrud.service';
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
    private keyboardcrudService: KeyboardcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.keyboardForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
    this.keyboardcrudService.read_Keyboards().subscribe(data => {
      let keyboards = data.map(e => {
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
      console.log(keyboards);
      keyboards.forEach(element => {
          if(element.id == this.id){
            this.keyboard = element;

        
                this.keyboardForm = new FormGroup({
                  name: new FormControl(this.keyboard.name),
                  category: new FormControl(this.keyboard.category),
                  price: new FormControl(this.keyboard.price),
                  cover: new FormControl(this.keyboard.cover),
                  description: new FormControl(this.keyboard.description),
                });
            
          }
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
            this.keyboard = this.keyboardForm.value;
            this.keyboard.id = this.id;
            this.keyboardcrudService.update_Keyboard(this.id, this.keyboard);
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

}
