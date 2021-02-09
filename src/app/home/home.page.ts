import { Component, OnInit } from '@angular/core';
import { IKeyboard } from '../shared/interfaces';
import { KeyboarddbService } from '../core/keyboarddbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public keyboards: IKeyboard[];
  keyboardsinit: IKeyboard[] = [
    {
      id: '1',
      name: 'Teclado razer',
      category: 'Mecánico',
      price: '72',
      cover:
        'https://img.pccomponentes.com/articles/30/309832/1389-razer-cynosa-v2-teclado-gaming-retroiluminado.jpg',
      description: "Desarrollado por Razer Chroma: 16.8 millones de opciones de color aseguran una experiencia de juego absolutamente individual, fácil de ajustar con Razer Synapse; rollover de 10 teclas.Teclas de calidad de torneo: Ofrecen comodidad, de modo que cada pulsación de tecla se sienta; cada vez que presiona un botón, puede sentir todo el recorrido de la tecla y la retroalimentación táctil, para obtener la precisión en el calor del momento"
    },
    {
      id: '2',
      name: 'Teclado hyperx',
      category: 'Mecánico',
      price: '130',
      cover:
        'https://img.pccomponentes.com/articles/30/304585/1344-hyperx-alloy-origins-teclado-mecanico-rgb.jpg',
      description: "El HyperX Alloy Origins™ es un teclado compacto y resistente con teclas mecánicas HyperX personalizadas diseñadas para proporcionar a los jugadores la mejor combinación de estilo, rendimiento y fiabilidad. Estas teclas tienen LED expuestos para una iluminación deslumbrante con una fuerza de actuación y una distancia de recorrido elegantemente equilibrada para una capacidad de respuesta y precisión."
    }
  ]
  constructor(private keyboarddbService: KeyboarddbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.keyboards !== undefined) {
      this.keyboards.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.keyboarddbService.empty()) {
      this.keyboardsinit.forEach(keyboard => {
        this.keyboarddbService.setItem(keyboard.id, keyboard);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.keyboarddbService.getAll().then(
      (data) => this.keyboards = data
    );
  }
  keyboardTapped(keyboard) {
    this.route.navigate(['details', keyboard.id]);
  }
}