import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';
import { Socios } from '../classes/socios';
import { HttpClient } from '@angular/common/http';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './socios-form.component.html',
  styleUrls: ['./socios-form.component.css'],
})
export class SociosSheetComponent {
  profileForm = new FormGroup({
    Nombre: new FormControl(''),
    Apellidos: new FormControl(''),
    Email: new FormControl(''),
    dia: new FormControl(''),
    mes: new FormControl(''),
    año: new FormControl(''),
    DNI: new FormControl(''),
    Direccion: new FormControl(''),
    genre: new FormControl(''),
    telefono: new FormControl(''),
  });

  constructor(
    private apiCall: ApiCallsService,
    private router: Router,
    private bottomsheet: MatBottomSheet
  ) {}

  async onSubmit() {
    await this.apiCall.PostSocios(this.profileForm.value);
    await this.bottomsheet.dismiss();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
}
