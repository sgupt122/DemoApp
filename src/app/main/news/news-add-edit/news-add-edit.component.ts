import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-news-add-edit',
	templateUrl: './news-add-edit.component.html',
	styleUrls: ['../news.component.scss'],
	animations: fuseAnimations
})
export class NewsAddEditComponent implements OnInit {
	@Input() public selected;
	@Output() public newNewsItemClicked: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	public ngOnInit(): void {}

	public newNewsItem(): void {
		this.newNewsItemClicked.emit(true);
	}
}
