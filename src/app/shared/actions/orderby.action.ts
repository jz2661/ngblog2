import { createAction, props } from '@ngrx/store';

export const UpdateOrderBy = createAction('UPDATE_ORDERBY_TYPE', props<{orderBy: string}>());