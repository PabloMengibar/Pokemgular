import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from '../../models/pokemonModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  currentImageIndex = 0;
  loading: boolean = true;
  errorMessage: string = ''
  public pokemon?: IPokemon;
  sprites: { url: string, active: boolean }[] = [];

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this.pokeDetails();
  }

  pokeDetails(): void {
    this._route.params.subscribe(params => {
      this._apiService.getPokemon(params['name']).subscribe({
        next: (res: IPokemon) => {
          this.pokemon = {
            ...res
          };
          this.loading = false;
          this.sprites = [
            { url: res.sprites.front_default, active: true },
            { url: res.sprites.back_default, active: false },
            { url: res.sprites.front_shiny, active: false },
            { url: res.sprites.back_shiny, active: false }
          ];
        },
        error: (err) => {
          this.errorMessage = 'Failed to fetch a pokemon detail'
          console.error('Failed to fetch a pokemon detail:', err);
        }
      });
    });
  }

  setActiveSlide(index: number): void {
    this.sprites = this.sprites.map((sprite, idx) => ({
      ...sprite,
      active: idx === index
    }));
    this.currentImageIndex = index;
  }
}
