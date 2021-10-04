import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  textoBuscar = '';
  cargando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'Avenger',
    'El señor de los anillos',
    'La vida es bella',
  ];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar(event: any) {
    const valor: string = event.detail.value;

    if (valor.length == 0) {
      this.cargando = false;
      this.peliculas = [];
      return;
    }

    this.cargando = true;

    this.moviesService.buscarPeliculas(valor).subscribe((resp) => {
      // console.log(resp);
      this.cargando = false;
      this.peliculas = resp['results'];
    });
  }

  async detalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
