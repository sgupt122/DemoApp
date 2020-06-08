import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { FaqsService } from '@/_services';
import { IApiSuccess, IFaq } from '@/_interfaces';
import * as fromFaqs from '@/main/faq/store';

@Injectable()
export class FaqsEffects {
	constructor(private _actions$: Actions, private _faqsService: FaqsService) {}

	@Effect()
	loadFaqs$ = this._actions$.pipe(
		ofType(fromFaqs.FaqsActionTypes.Load),
		mergeMap((action: fromFaqs.Load) =>
			this._faqsService.getFaqs().pipe(
				map((faqs: IApiSuccess<IFaq[]>) => new fromFaqs.LoadSuccess(faqs)),
				catchError(err => of(new fromFaqs.LoadFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateFaq$ = this._actions$.pipe(
		ofType(fromFaqs.FaqsActionTypes.UpdateFaq),
		map((action: fromFaqs.UpdateFaq) => action.payload),
		mergeMap((faq: IFaq) =>
			this._faqsService.updateFaq(faq).pipe(
				map(updatedFaq => new fromFaqs.UpdateFaqsSuccess(updatedFaq)),
				catchError(err => of(new fromFaqs.UpdateFaqFail(err.error.message)))
			)
		)
	);

	@Effect()
	createFaq$: Observable<Action> = this._actions$.pipe(
		ofType(fromFaqs.FaqsActionTypes.CreateFaq),
		map((action: fromFaqs.CreateFaq) => action.payload),
		mergeMap((faq: IFaq) =>
			this._faqsService.createFaq(faq).pipe(
				map(newFaq => new fromFaqs.CreateFaqsSuccess(newFaq)),
				catchError(err => of(new fromFaqs.CreateFaqFail(err.error.message)))
			)
		)
	);
}
