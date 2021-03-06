import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HeaderComponent} from './header/header.component';
import {CategoryComponent} from './category/category.component';
import {FocusDirective} from './directives/focus.directive';
import {MenuComponent} from './menu/menu.component';
import {MenuEntryComponent} from './menu-entry/menu-entry.component';
import {ProductGroupComponent} from './product-group/product-group.component';
import {CardComponent} from './card/card.component';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';
import {DynamicComponent} from './dynamic/dynamic.component';
import {ContactComponent} from './contact/contact.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CardSwitcherComponent} from './card-switcher/card-switcher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    CategoryComponent,
    FocusDirective,
    MenuComponent,
    MenuEntryComponent,
    ProductGroupComponent,
    CardComponent,
    DynamicContentComponent,
    DynamicComponent,
    ContactComponent,
    ProductDetailComponent,
    CardSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent},
      {path: 'category/:id', component: CategoryComponent},
      {path: 'products/:id', component: ProductGroupComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'dynamic/:id', component: DynamicComponent},
      {path: 'contact', component: ContactComponent},
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  // providers: [{provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
