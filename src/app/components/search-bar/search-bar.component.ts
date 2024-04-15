import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
@Output() searchTextChange  = new EventEmitter<string>();
searchText:string = ''

sendSearchValue(){
  this.searchTextChange.emit(this.searchText);
}
}
