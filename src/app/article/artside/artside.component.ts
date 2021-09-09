import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Article } from '../../shared/services';

@Component({
  selector: 'ngb-artside',
  templateUrl: './artside.component.html',
  styleUrls: ['./artside.component.scss']
})
export class ArtsideComponent implements OnInit {
  public avatar: string;
  @Input() recentarticles: Article[];

  constructor() { }

  ngOnInit(): void {
    this.avatar = 'assets/img/avatar.jpg';
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
