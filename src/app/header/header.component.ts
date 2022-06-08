import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name_search: string;
  filter_params: any;

  sort_value = {
    value: 'first_name',
    asc: true
  }

  sort_options: any[] = [
    {
      title: 'Förnamn',
      value: 'first_name'
    },
    {
      title: 'Efternamn',
      value: 'last_name'
    },
    {
      title: 'Födelseår',
      value: 'birth_year'
    },
  ];

  @Output() filter_output = new EventEmitter<any>()

  constructor() {
    this.name_search = '';
    this.filter_params = {
      filter_string: '',
      min_age: 0,
      max_age: 100
    }
  }

  ngOnInit(): void {
  }

}
