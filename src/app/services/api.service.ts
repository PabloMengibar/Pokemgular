import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IPokemon, PokemonRes } from '../models/pokemonModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private_http = inject(HttpClient)
  private urlBase:string = 'https://pokeapi.co/api/v2/pokemon/'

  getPokemonList(): Observable<PokemonRes> {
    return this.private_http.get<PokemonRes>(`${this.urlBase}?limit=151`).pipe(
      catchError(error => {
        throw 'Error in pokemon list: ' + error;
      })
    );
  }

  getPokemon(pokemonName: string): Observable<IPokemon> {
    return this.private_http.get<IPokemon>(`${this.urlBase}${pokemonName}`).pipe(
      catchError(error => {
        throw 'Error in pokemon details: ' + error;
      })
    );
  }
}
