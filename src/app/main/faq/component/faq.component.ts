import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { IFaq } from '@/_interfaces';
import { faq } from '@/_config/config';

@Component({
	selector: 'faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class FaqComponent implements OnInit {
	@Input() public faqs: IFaq[];
	@Input() public faqsFiltered: IFaq[];
	@Input() public error: string;
	public step: number;
	public faqConfig = faq.faq;
	constructor() { }

	public ngOnInit(): void {
		this.step = 0;
	}

	public updateFilter(searchString: string): void {
		this.faqsFiltered = FuseUtils.filterArrayByString(this.faqs, searchString);
	}

	public setStep(index: number): void {
		this.step = index;
	}

	public nextStep(): void {
		this.step++;
	}

	public prevStep(): void {
		this.step--;
	}
}
