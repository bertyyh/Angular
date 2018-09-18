import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
  { path: 'home', component: HomeComponent,
    children:[
      { path: 'list', component: ListComponent}
    ]
  },
  { path: 'status', component: StatusComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'application/:id', component: ApplicationComponent },
  { path: 'appdescription/:pid/:aid', component: AppDescriptionComponent },
  { path: 'config/:pid/:aid', component: ConfigComponent },
  { path: 'addconfig/:pid/:aid', component: AddconfigComponent },
  { path: 'configdetail/:pid/:aid/:key', component: ConfigDetailComponent },
  { path: 'addApp/:id', component: AddApplicationComponent },
  { path: 'createproduct', component: CreatproductsComponent},
  { path: '', redirectTo: '/status', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
