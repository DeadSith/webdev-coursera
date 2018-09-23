import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut , expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut(),
      expand()
  ]
})
export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }
    
  leaders: Leader[];
  leaderErrMess: string;


  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      errmess => this.leaderErrMess = <any>errmess.message);
}

  

}