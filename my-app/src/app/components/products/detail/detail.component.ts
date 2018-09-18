import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../apiConfig';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private productId: any;
  private productDetail= {
    Name: '',
    Description: '',
    CreateTime: '',
    UpdateTime: ''
  };
  private productDetailKey: any;
  constructor(private routeInfo: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.productId = this.routeInfo.snapshot.params['id'];
    this.getDescription(this.productId);
  }
  getDescription (id) {
    this.http.get('/siteapi' + api.addproduct + '/' + id).subscribe(data => {
      this.productDetail= data['Data'];
      this.productDetailKey = Object.keys(data['Data']);
      // this.getAllProduct();
    });
  }

}
