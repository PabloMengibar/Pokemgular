import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { pokeRequest } from '../models/pokeRequest';
import { pokeModel } from '../models/pokemonModel';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get pokemon list', () => {
    const mockPokemonList: pokeRequest = {
      count: 151,
      results: []
    };

    service.getPokemonList().subscribe((pokemonList) => {
      expect(pokemonList).toEqual(mockPokemonList);
    });

    const req = httpTestingController.expectOne(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPokemonList);
  });

  it('should get pokemon by name', () => {
    const mockPokemon: pokeModel = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
      },
      stats: [],
      types: []
    };

    service.getPokemon('bulbasaur').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne(`https://pokeapi.co/api/v2/pokemon/bulbasaur`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPokemon);
  });
});
