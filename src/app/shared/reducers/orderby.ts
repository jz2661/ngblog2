import { Action, createReducer, on } from '@ngrx/store';
import { UpdateOrderBy } from '../actions/orderby.action';

const orderByReducer = createReducer("date",
  on(UpdateOrderBy, (state, {orderBy}) => (orderBy)));

export function orderReducer(state: string | undefined, action: Action) {
  return orderByReducer(state, action);
}