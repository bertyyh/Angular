import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../apiConfig';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  private productId: any;
  constructor(private routeInfo: ActivatedRoute, private http: HttpClient, private router: Router) {}

  i = 1;
  editCache = {};
  dataSet = [];

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    this.editCache[key].edit = false;
    let saveMsg = {
      name: this.dataSet[index].Name,
      description: this.dataSet[index].Description
    };
    this.http.put('/siteapi' + api.app + '/' + this.productId + '/test_app', saveMsg).subscribe(data => {
      console.log(data);
    });
  }
  delete(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    this.http.delete('/siteapi' + api.app + '/' + this.productId + '/' + this.dataSet[index].key).subscribe(data => {
      this.getApp(this.productId);
    }, (err) => {
      console.log(err);
    });
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          delete: false,
          data: item
        };
      }
    });
  }
  getApp (id) {
    this.http.get('/siteapi' + api.app + '/' + id + '/all').subscribe(data => {
      var arrApp = [];
      for (var key in data['Data']) {
        data['Data'][key].key = key;
        arrApp.push(data['Data'][key])
      }
      this.dataSet = arrApp;
      this.updateEditCache();
    });
  }
  /**
   * 创建应用
   */
  creatApp () {
    let AID: any = 'test_app';
    this.router.navigate(['/addApp', this.productId]);
  }

  ngOnInit(): void {
    this.productId = this.routeInfo.snapshot.params['id'];
    this.getApp(this.productId);
  }

}
