import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FuseUtils } from '@fuse/utils';
import { INews } from '@/_interfaces';

@Component({
	selector: 'app-news-filter',
	templateUrl: './news-filter.component.html',
	styleUrls: ['../news.component.scss']
})
export class NewsFilterComponent implements OnChanges, OnInit {
	@Input() public news: INews[];
	@Output() public filterNewsUpdated: EventEmitter<INews[]> = new EventEmitter();
	public filteredRows: INews[];

	constructor() {}

	public ngOnInit(): void {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.rows) {
			this.filterNewsUpdated.emit(this.news);
		}
	}

	public updateFilter(searchString: string): void {
		if (searchString === '') {
			return this.filterNewsUpdated.emit(this.news);
		}
		this.filteredRows = FuseUtils.filterArrayByString(this.news, searchString);
		this.filterNewsUpdated.emit(this.filteredRows);
	}
}
