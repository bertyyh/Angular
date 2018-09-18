import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { api } from '../../../../apiConfig';

@Component({
  selector: 'app-addconfig',
  templateUrl: './addconfig.component.html',
  styleUrls: ['./addconfig.component.css']
})
export class AddconfigComponent implements OnInit {
  private Pid: any;
  private Aid: any;
  public ConfigMsg = {
    value: ''
  };
  constructor(private routeInfo: ActivatedRoute, private message: NzMessageService, private http: HttpClient,
    private router: Router) { }

  public addConfig () {
    if (this.ConfigMsg.value == '') {
      return this.message.info('请输入配置名!')
    }
    let key = 'key_' +  Math.ceil(Math.random() * 10000);
    this.http.post('/siteapi' + api.config + '/' + this.Pid + '/' + this.Aid + '/' + key,this.ConfigMsg).subscribe(data => {
      console.log(data);
    });
  }
  ngOnInit() {
    this.Pid = this.routeInfo.snapshot.params['pid'];
    this.Aid = this.routeInfo.snapshot.params['aid'];
  }

}
