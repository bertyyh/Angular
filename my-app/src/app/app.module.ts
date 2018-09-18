import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/home/list/list.component';
import { StatusComponent } from './components/status/status.component';
import { ProductsComponent } from './components/products/products.component';
import { CreatproductsComponent } from './components/creatproducts/creatproducts.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { ApplicationComponent } from './components/products/application/application.component';
import { AddApplicationComponent } from './components/products/add-application/add-application.component';
import { AppDescriptionComponent } from './components/products/application/app-description/app-description.component';
import { ConfigComponent } from './components/products/application/config/config.component';
import { AddconfigComponent } from './components/products/application/addconfig/addconfig.component';
import { ConfigDetailComponent } from './components/products/application/config-detail/config-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    StatusComponent,
    ProductsComponent,
    CreatproductsComponent,
    DetailComponent,
    ApplicationComponent,
    AddApplicationComponent,
    AppDescriptionComponent,
    ConfigComponent,
    AddconfigComponent,
    ConfigDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
