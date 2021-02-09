import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboarddbService } from '../core/keyboarddbservice.service';
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
    private keyboarddbService: KeyboarddbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.keyboarddbService.getItem(this.id).then(
      (data: IKeyboard) => this.keyboard = data
    );
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
            this.keyboarddbService.remove(id);
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