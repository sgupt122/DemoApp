import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFaq from '@/main/faq/store';
import { IFaq } from '@/_interfaces';

@Component({
	selector: 'app-faq-shell',
	templateUrl: './faq-shell.component.html',
	styleUrls: ['./faq-shell.component.scss']
})
export class FaqShellComponent implements OnInit {
	public faqs$: Observable<IFaq[]>;
	public faqsFiltered$: Observable<IFaq[]>;
	public error$: Observable<string>;

	constructor(private _store: Store<fromFaq.IFaqsState>, private _titleService: Title) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`FAQs - Charcoal`);
		this._store.dispatch(new fromFaq.Load());
		this.faqs$ = this._store.pipe(select(fromFaq.getFaqs));
		this.faqsFiltered$ = this._store.pipe(select(fromFaq.getFaqs));
		this.error$ = this._store.pipe(select(fromFaq.getError));
	}
}
