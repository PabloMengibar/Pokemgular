import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    {path:'home', component: PokemonListComponent},
    {path:'pokemon/:name', component: PokemonDetailsComponent},
    {path:'**', component: PokemonListComponent}
];
