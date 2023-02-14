import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
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

  constructor() {}
}
