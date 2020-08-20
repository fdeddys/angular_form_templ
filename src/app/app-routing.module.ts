import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './entity/product/product.component';
import { ProductViewComponent } from './entity/product/product-view/product-view.component';


const routes: Routes = [
  { path: '', redirectTo:'product', pathMatch: 'full' },
  { path: '*', redirectTo:'product', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'product/:code', component: ProductViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
