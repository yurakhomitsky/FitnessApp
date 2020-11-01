import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { Meal } from '../../../shared/interfaces/Meal.interface';
import { MealsStoreService } from '../../../store/services/meals.store.service';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public data$: Observable<{
    meal: Meal,
    isLoading: boolean;
  }>;

  constructor(private mealsStoreService: MealsStoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealsStoreService.resetCurrentMeal();
    this.subscription = this.initRouterListener().subscribe();
    this.data$ = this.initData();
  }

  get isLoading$(): Observable<boolean> {
    return this.mealsStoreService.isLoading;
  }

  get meal$(): Observable<Meal> {
    return this.mealsStoreService.selectMeal;
  }

  public onAddMeal(meal: Meal): void {
    this.mealsStoreService.create(meal);
  }

  public onUpdateMeal(meal: Meal): void {
    this.mealsStoreService.update(meal);
  }

  public onRemoveMeal(meal: Meal): void {
    this.removeMeal(meal);
  }

  private initRouterListener(): Observable<Params> {
    return this.route.params.pipe(
      filter((param) => param.id),
      tap((param) => {
        if (param.id) {
          this.mealsStoreService.find(param.id);
        }
      })
    );
  }

  private initData(): Observable<{
    meal: Meal,
    isLoading: boolean;
  }> {
    return combineLatest(this.meal$, this.isLoading$).pipe(
      map(([meal, isLoading]) => {
        return {
          meal,
          isLoading
        };
      }),
    );
  }

  private removeMeal(meal: Meal): void {
    this.mealsStoreService.remove(meal.key);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
