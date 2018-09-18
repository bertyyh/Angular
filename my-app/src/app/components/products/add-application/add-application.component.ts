import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { api } from '../../../apiConfig';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {

  private productId: any;
  public AppMsg = {
    name: '',
    description: ''
  };
  constructor(private routeInfo: ActivatedRoute,private message: NzMessageService, private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.productId = this.routeInfo.snapshot.params['id'];
  }

 public creatApp() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let AID = 'test_app' + Math.ceil(Math.random() * 10000);
    if (this.AppMsg.name.length == 0 && this.AppMsg.description.length == 0) {
      return this.message.info('请输入产品名、产品描述!')
    }
    this.http.post('/siteapi' + api.app + '/' + this.productId + '/' + AID, this.AppMsg).subscribe(data => {
      console.log(data);
      this.router.navigate(['/application', this.productId])
    })
  }

}
