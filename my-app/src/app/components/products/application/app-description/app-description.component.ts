import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../apiConfig';

@Component({
  selector: 'app-app-description',
  templateUrl: './app-description.component.html',
  styleUrls: ['./app-description.component.css']
})
export class AppDescriptionComponent implements OnInit {
  private Pid: any;
  private Aid: any;
  private Msg = {
    Name: '',
    Description: '',
    CreateTime: '',
    UpdateTime:'',
  };
  private MsgKey = [];
  constructor(private routeInfo: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.Pid = this.routeInfo.snapshot.params['pid'];
    this.Aid = this.routeInfo.snapshot.params['aid'];

    this.http.get('/siteapi' + api.app + '/' + this.Pid + '/' + this.Aid).subscribe(data => {
      console.log(data);
      this.MsgKey = Object.keys(data['Data']);
      this.Msg = data['Data'];
    });
  }

}
