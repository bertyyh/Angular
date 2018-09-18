import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

// import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public activeRoute: any;
  private msg: any= "home";
  constructor(private router: Router, private activatedRoute: ActivatedRoute,){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log(event.urlAfterRedirects);
        let arr = ['detail', 'application', 'addApp', 'appdescription','config'];
        let Tf = arr.some((item, index) => {
          return event.urlAfterRedirects.indexOf(item) != -1;
        });
        if (Tf) {
          this.activeRoute = '/products';
        } else {
          this.activeRoute = event.urlAfterRedirects;
        }
      }
    });

    // this.router.events.pipe(
    //   filter((event: Event) => event instanceof NavigationEnd)
    // ).subscribe(x => console.log(x))
  }
  ngOnInit() {

  }
  tabClick (value: string) {
    this.msg = value;
  }
}
