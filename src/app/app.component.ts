import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngb-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  goToLink(url: string){
    window.open(url, "_blank");
  }
}

