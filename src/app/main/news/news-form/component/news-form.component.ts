import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { INews, IUser } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-news-form',
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss'],
	animations: fuseAnimations
})
export class NewsFormComponent implements OnInit {
	@Input() public action: string;
	@Input() public newsItem: INews;
	@Input() public user: IUser;
	@Output() public create = new EventEmitter<INews>();
	@Output() public update = new EventEmitter<INews>();

	constructor(private shared: SharedFunctions, private _router: Router) { }

	public ngOnInit(): Promise<boolean> {
		if (!this.newsItem) {
			return this._router.navigate(['/news']);
		}
	}

	public save(): void {
		this.shared._snackbarMessage('News saved!', 1000)
			.afterDismissed()
			.subscribe(() => {
				this._router.navigate(['/news']);
			});
		if (this.newsItem.id) {
			return this.update.emit(this.newsItem);
		}
		this.newsItem.user_id = this.user.id;
		this.create.emit(this.newsItem);
	}
}
