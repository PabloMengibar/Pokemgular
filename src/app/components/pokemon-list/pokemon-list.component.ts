import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IPokemon } from '../../models/pokemonModel';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, SearchBarComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: IPokemon[] = [];
  searchText: string = '';

  private _apiService = inject(ApiService);
  private _router = inject(Router);

  ngOnInit(): void {
    this.pokeInfo();
  }

  pokeInfo(): void {
    this._apiService.getPokemonList().pipe(
      catchError(err => {
        console.error('Failed to fetch pokemon list:', err);
        return of({ results: [] }); 
      }),
      switchMap(res => forkJoin(
        res.results.map(pkm => this._apiService.getPokemon(pkm.name).pipe(
          catchError(err => {
            console.error('Failed to fetch details for pokemon:', err);
            return of(null); 
          })
        ))
      )),
      catchError(err => {
        console.error('Error while fetching all pokemons:', err);
        return of([]); 
      })
    ).subscribe({
      next: (pokemonDetails: (IPokemon | null)[]) => {
        this.pokemonList = pokemonDetails.filter(detail => detail !== null).map(res => ({
          name: res!.name,
          id: res!.id,
          sprites: res!.sprites,
          types: res!.types.map(t => ({ slot: t.slot, type: t.type })), 
          stats: res!.stats,
          abilities: res!.abilities,
          weight: res!.weight,
          height: res!.height
        }));
      },
      error: err => console.error('Unhandled error:', err),
      complete: () => console.log('All pokemons fetched.')
    });
  }

  onSearchTextChange($event: string): void {
    this.searchText = $event;
  }

  navegate(pokemon: IPokemon): void {
    this._router.navigate(['/pokemon', pokemon.name]);
  }
}
