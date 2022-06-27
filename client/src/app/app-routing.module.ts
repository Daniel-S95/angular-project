import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ApiDocsComponent } from './components/api-docs/api-docs.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersShopComponent } from './components/users-shop/users-shop.component';
import { AdminGuard } from './guards/admin.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterGuard } from './guards/register.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: "register", canActivate: [RegisterGuard], component: RegisterComponent },
  { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
  { path: "shop", canActivate: [LoginGuard, UserGuard], component: UsersShopComponent },
  { path: "api-docs", component: ApiDocsComponent },
  { path: "checkout", canActivate: [LoginGuard, UserGuard, CheckoutGuard], component: CheckoutComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
