import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parliament-parties',
  templateUrl: './parliament-parties.component.html',
  styleUrls: ['./parliament-parties.component.scss']
})
export class ParliamentPartiesComponent implements OnInit {
  parliament_members: Array<any>;

  constructor() {
    this.parliament_members = [];
  }

  async ngOnInit(): Promise<any> {
    let res = await this.callApi('http://data.riksdagen.se/personlista/?utformat=json');
    console.log({res})
    this.parliament_members = res.personlista.person;
  }
  
  async callApi(url: string) {
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong when loading the data. Please try to refresh the page');
        }
      })
      .then(data => {return data});
  }
}
