import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'app-news-content',
	templateUrl: './news-content.component.html',
	styleUrls: ['../news.component.scss']
})
export class NewsContentComponent implements OnChanges {
	@Input() public news;
	@Input() public filteredNews;
	@Input() public isAdmin;
	@Input() public selected;
	@Output() public newsSelected = new EventEmitter<number | null>();
	public pageSize = 10;

	constructor() {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.filteredNews && this.filteredNews && this.news && this.filteredNews.length === this.news.length) {
			this.setPage({ length: this.news.length, pageIndex: 0, pageSize: this.pageSize });
		}
		if (changes.news) {
			this.setPage({ length: this.news.length, pageIndex: 0, pageSize: this.pageSize });
		}
	}

	public setPage(page: PageEvent): void {
		this.filteredNews = [...this.news];
		this.filteredNews = this.filteredNews.splice(page.pageIndex * page.pageSize, (page.pageIndex + 1) * page.pageSize);
	}

	public newsItemSelected(newsID: number | null): void {
		const emittedValue = this.selected && this.selected.id === newsID ? null : newsID;
		this.newsSelected.emit(emittedValue);
	}
}
