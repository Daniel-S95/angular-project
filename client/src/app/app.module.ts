import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminComponent } from './components/admin/admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { WhyFromUsComponent } from './components/why-from-us/why-from-us.component';
import { GeneralStatsHomeComponent } from './components/general-stats-home/general-stats-home.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { CategoriesNavigationComponent } from './components/categories-navigation/categories-navigation.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UsersShopComponent } from './components/users-shop/users-shop.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { CharLimitPipe } from './pipes/char-limit.pipe';
import { ApiDocsComponent } from './components/api-docs/api-docs.component';
import { ProductPopupComponent } from './components/product-popup/product-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    WhyFromUsComponent,
    GeneralStatsHomeComponent,
    AddEditProductComponent,
    CategoriesNavigationComponent,
    ProductsContainerComponent,
    ProductCardComponent,
    UsersShopComponent,
    CartItemsComponent,
    SearchBarComponent,
    CheckoutComponent,
    SearchHighlightPipe,
    CharLimitPipe,
    ApiDocsComponent,
    ProductPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPasswordStrengthModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    ClipboardModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
