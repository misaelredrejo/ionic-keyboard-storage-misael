import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardcrudService } from '../core/keyboardcrud.service';
import { IKeyboard } from '../shared/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public keyboard: IKeyboard;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private keyboardcrudService: KeyboardcrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    
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
          }
      });
    });
  }

  editRecord(keyboard) {
    this.router.navigate(['edit', keyboard.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar teclado',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.keyboardcrudService.delete_Keyboard(id);
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