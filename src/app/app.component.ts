import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parliament-party-list';
  party_names: string[] = [];

  filter_string: string = '';
  min_age: number = 0;
  max_age: number = 100;
  sort_value: string = 'first_name';
  sort_asc: boolean = true;

  handle_output(e:any) {
    this.sort_value = e.sort_value.value;
    this.sort_asc = e.sort_value.asc;
    this.filter_string = e.filter_params.filter_string;
    this.max_age = e.filter_params.max_age;
    this.min_age = e.filter_params.min_age;
  }
}
