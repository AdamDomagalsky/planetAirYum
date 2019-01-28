import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';

export interface Character {
    id: number;
    name: string;
    species: string;
    gender: string;
    homeworld: string;
}

export interface Planet {
  name: string; 
  rotation_period: number; 
  orbital_period: number; 
  diameter: number; 
  climate: string; 
  gravity: string; 
  terrain: string[]; 
  surface_water: number; 
  population: number; 
  residents: string[]; 
  films: string[]; 
  created: Date; 
  edited: Date; 
  url: string;
}

interface Planets {
    count: number; 
    next: string;
    previous: string; 
    results: Planet[];
  }

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
    planetsURL = 'https://swapi.co/api/planets/';
    
    speciesURL = 'http://localhost:3000/species';
    charactersURL = 'http://localhost:3000/characters';
    queryURL = '?q=';

    constructor(private http: HttpClient) { }


getPlanets() {
    return this.http.get<Planets>(this.planetsURL)       
        .pipe(
            retry(3),
            catchError(err => throwError(new Error(err))),
        )
}

}