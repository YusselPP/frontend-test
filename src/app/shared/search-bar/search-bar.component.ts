import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {
  @Output() queryChange = new EventEmitter();

  query: string;

  constructor() {}

  ngOnInit(): void {}

  onQueryChange() {
    this.queryChange.emit(this.query);
  }
}
