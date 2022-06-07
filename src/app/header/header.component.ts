import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name_search: string;
  @Output() filter_output = new EventEmitter<string>()

  constructor() {
    this.name_search = '';
  }

  ngOnInit(): void {
  }

}
