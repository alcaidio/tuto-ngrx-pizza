import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';


@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    this.store.dispatch(new fromStore.LoadPizzas());
  }
}
