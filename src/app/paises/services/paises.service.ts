import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {

  private baseUrl: string = "https://restcountries.com/v2"

  private _regiones = [
    { cod: 'EU ', region: 'European Union' },
    {
      cod: 'EFTA ',
      region:'European Free Trade Association',
    },
    {
      cod: 'CARICOM',
      region:'Caribbean Community',
    },
    {
      cod: 'PA',
      region:'Pacific Alliance',
    },
    {
      cod: 'AU',
      region:'African Union',
    },
    {
      cod: 'USAN',
      region:'Union of South American Nations',
    },
    {
      cod: 'EEU',
      region:'Eurasian Economic Union',
    },
    {
      cod: 'AL',
      region:'Arab League',
    },
    {
      cod: 'ASEAN',
      region:'Association of Southeast Asian Nations',
    },
    {
      cod: 'CAIS',
      region:'Central American Integration System',
    },
    {
      cod: 'CEFTA',
      region:'Central European Free Trade Agreement',
    },
    {
      cod: 'NAFTA',
      region:'North American Free Trade Agreement',
    },
    {
      cod: 'SAARC',
      region:'South Asian Association for Regional Cooperation',
    },
  ];

  get regiones() {
    return [...this._regiones];
  }

  constructor(private http:HttpClient) {}

  getPaisesPorRegion( region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/regionalbloc/${region}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo ( codigo: string ): Observable<Pais[]> {

    if(!codigo) {
      return of([])
    }

    const url: string = `${this.baseUrl}/alpha/?codes=${codigo}`
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigoSmall ( codigo: string ): Observable<PaisSmall> {

    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]>{
    if(!borders) {
      return of([])
    }
    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach(codigo => {
      const peticion: any = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion)
    });

    return combineLatest(peticiones);
  }

}
