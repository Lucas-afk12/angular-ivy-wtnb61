import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SociosSheetComponent } from '../socios-form/socios-form.component';
import { personalInfo, Socios } from '../classes/socios';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  constructor(
    private form: MatBottomSheet,
    private apiCall: ApiCallsService,
    private router: Router
  ) {}

  Socios: Socios[] = [];

  async openForm() {
    const bottomSheetRef = this.form.open(SociosSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(async (profileForm) => {
      await this.apiCall.PostSocios(profileForm.value);
      location.reload();
    });
  }

  ngOnInit() {
    this.Socios = [];
    this.apiCall.getSocios().subscribe((SociosArr: Socios[]) => {
      SociosArr.forEach((Socio: any) => {
        let personalInfo: any = {
          Nombre: Socio.personalInfo.Nombre,
          Apellidos: Socio.personalInfo.Apellidos,
          Email: Socio.personalInfo.Email,
          FechaDeNacimiento: Socio.personalInfo.FechaDeNacimiento,
          Direccion: Socio.personalInfo.Direccion,
          DNI: Socio.personalInfo.DNI,
          Genero: Socio.personalInfo.Genero,
          NumeroTlf: Socio.personalInfo.NumeroTlf,
        };

        let filmsInfo: any = {
          Peliculas_alquiladas: Socio.filmsInfo.Peliculas_alquiladas,
          Peliculas_devueltas: Socio.filmsInfo.Peliculas_devueltas,
        };
        let socio = new Socios(personalInfo, filmsInfo, Socio.Socios_id);
        socio.AlquilatedCount();
        socio.DevueltasCount();
        this.Socios.push(socio);
      });

      console.log(this.Socios);
    });
  }
}
