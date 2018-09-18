import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../apiConfig';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private http: HttpClient) {
   var that=this;
  }

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
    var updataMsg = {
      "Name": this.dataSet[index].Name,
      "Description": this.dataSet[index].Description
    }
    this.http.put('/siteapi' + api.addproduct + '/' + this.dataSet[index].key, updataMsg).subscribe(data => {
      console.log(data);
    });
    this.editCache[key].edit = false;
  }
  delete(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    this.http.delete('/siteapi' + api.addproduct + '/' + this.dataSet[index].key).subscribe(data => {
      console.log(data);
      // this.getAllProduct();
    },(err)=>{
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
 getAllProduct() {
   this.http.get('/siteapi' + api.product).subscribe(data => {
     var arrProduct = [];
     for (var key in data['Data']) {

       data['Data'][key].key = key;
       arrProduct.push(data['Data'][key])
     }
     this.dataSet = arrProduct;
     this.updateEditCache();
     console.log(this.dataSet);

   });
 }

  ngOnInit(): void {
    this.getAllProduct();
    // for (let i = 0; i < 100; i++) {
    //   this.dataSet.push({
    //     key: i.toString(),
    //     name: `Edrward ${i}`,
    //     age: 32,
    //     address: `London Park no. ${i}`,
    //   });
    // }
    // this.updateEditCache();
  }

}
