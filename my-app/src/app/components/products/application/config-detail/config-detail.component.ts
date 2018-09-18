import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../apiConfig';

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.css']
})
export class ConfigDetailComponent implements OnInit {
  private Pid: any;
  private Aid: any;
  private Key: any;
  private Msg: any;
  constructor(private routeInfo: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.Pid = this.routeInfo.snapshot.params['pid'];
    this.Aid = this.routeInfo.snapshot.params['aid'];
    this.Key = this.routeInfo.snapshot.params['key'];
    this.http.get('/siteapi' + api.config + '/' + this.Pid + '/' + this.Aid + '/' + this.Key).subscribe(data => {
      this.Msg = data['Data'];
    })
  }

}
