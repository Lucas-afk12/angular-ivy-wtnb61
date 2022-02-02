import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socios } from './classes/socios';
@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}

  getSocios() {
    return this.http.get<Socios[]>('https://klk-api.herokuapp.com/socios');
  }

  PostSocios(SocioInsert: any) {
    console.log(SocioInsert);
    return this.http
      .post('https://klk-api.herokuapp.com/socios', SocioInsert)
      .subscribe((res) => console.log(res));
  }

  deleteSocios(id: string) {
    return this.http
      .delete(`https://klk-api.herokuapp.com/socios/${id}`)
      .subscribe((res) => console.log(res));
  }
}
