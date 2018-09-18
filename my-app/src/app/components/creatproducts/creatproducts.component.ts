import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../apiConfig';

@Component({
  selector: 'app-creatproducts',
  templateUrl: './creatproducts.component.html',
  styleUrls: ['./creatproducts.component.css']
})
export class CreatproductsComponent implements OnInit {
  public Msg= {
    name: '',
    description: ''
  };
  constructor(private message: NzMessageService,private http: HttpClient) { }

  ngOnInit() {
  }

  creatProduct () {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let PID =''+ new Date().getTime();
    if (!this.Msg.name && !this.Msg.description){
       return this.message.info('请输入产品名、产品描述!')
    }
    this.http.post('/siteapi' + api.addproduct + '/' + PID, JSON.stringify(this.Msg), { headers: headers }).subscribe(data =>{
      console.log(data);
    })
  }

}
