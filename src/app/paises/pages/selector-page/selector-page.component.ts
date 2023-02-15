import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llevar selectores
  regiones: any[] = [];
  paises: PaisSmall[] = [];
  /* fronteras: string[] = []; */
  fronteras: PaisSmall[] = [];

  // UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesServices: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;

    // Cuando cambia la region
    /* this.miFormulario.get('region')?.valueChanges
      .subscribe(region => {
        console.log(region);

        this.paisesServices.getPaisesPorRegion(region)
        .subscribe(paises => {
          console.log(paises);
          this.paises = paises;
        })
      }) */
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesServices.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    // Cuando cambia el país
    this.miFormulario.get('pais')?.valueChanges
    .pipe (
      tap((_) => {
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap( codigo => this.paisesServices.getPaisPorCodigo(codigo) ),
      switchMap( pais => this.paisesServices.getPaisesPorCodigos(pais[0]?.borders!) )
    )
    .subscribe(paises => {
      console.log(paises);
      /* this.fronteras = pais[0]?.borders || []; */
      this.fronteras = paises;
      this.cargando = false;
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
