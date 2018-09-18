import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../apiConfig';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  private Pid: any;
  private Aid: any;
  constructor(private routeInfo: ActivatedRoute, private http: HttpClient, private router: Router) { }

  i = 1;
  editCache = {};
  dataSet = [];

  public startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  public cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }

  public saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    this.editCache[key].edit = false;
    this.http.put('/siteapi' + api.config + '/' + this.Pid + '/' + this.Aid + '/' + key, { value: this.editCache[key].value}).subscribe(data => {
      // console.log(data);
    })
  }
  public delete(key: string): void {
    this.http.delete('/siteapi' + api.config + '/' + this.Pid + '/' + this.Aid + '/' + key).subscribe(data => {
      // console.log(data);
      this.getConfig(this.Pid, this.Aid);
    })
  }

  public updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          data: item
        };
      }
    });
  }
  public getConfig(pid, aid): void {
    this.http.get('/siteapi' + api.config + '/' + pid + '/' + aid + '/all').subscribe(data => {
      // console.log(data);
      var arrApp = [];
      for (var key in data['Data']) {
        let Mesage = {
            name:data['Data'][key] ,
            key: key
          };
        arrApp.push(Mesage)
      }
      this.dataSet = arrApp;
      this.updateEditCache();
    });
  }
  public addConfig () {
    this.router.navigate(['/addconfig', this.Pid,this.Aid]);
  }

  ngOnInit(): void {
    this.Pid = this.routeInfo.snapshot.params['pid'];
    this.Aid = this.routeInfo.snapshot.params['aid'];
    this.getConfig(this.Pid, this.Aid);
  }

}
