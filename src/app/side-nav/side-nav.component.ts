import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() parties: string[];
  active_element: string;

  constructor() {
    this.parties = [];
    this.active_element = '';
  }

  ngOnInit(): void {
    this.active_element = this.parties[0] || '';
  }

}