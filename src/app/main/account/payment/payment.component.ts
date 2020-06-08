import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { IUser } from '@/_interfaces';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentStripeService } from '@/_services/paymentStripe.service';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { accounts } from '@/_config/config';

interface IActiveCard {
	card_id: string;
	card_number: string;
	created_at: string;
	customer_id: string;
	exp_month: string;
	exp_year: string;
	id: number;
	is_default: number;
	updated_at: null;
	user_id: number;
}


@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
	@LocalStorage() user: IUser;
	public paymentFg = new FormGroup({
		name: new FormControl(),
		amount: new FormControl(),
		cardNo: new FormControl(),
		cvv: new FormControl()
	});
	private card: any;
	public activeCard: IActiveCard;
	private elements = this.pmt.stripe.elements();
	public style = {
		base: {
			color: '#32325d',
			fontFamily: "'Muli', 'Helvetica Neue', 'Arial', sans- serif",
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		}
	};
	public cards: [] = [];
	public showNewCard: boolean = false;
	private paymentType: string = '';
	public paymentConfig = {
		payment: accounts.agentPayment
	}
	constructor(private router: Router, private pmt: PaymentStripeService, private _authService: AuthenticationService, private shared: SharedFunctions) {
		if (this.user.roles[0] !== 'agent') {
			this.router.navigateByUrl('/dashboard');
		}
		this.getCards();
	}


	ngOnInit(): void {
		this.card = this.elements.create('card', {
			style: this.style,
			hidePostalCode: true,
		});
		this.card.mount('#card-element');
		this.card.addEventListener('change', (event) => {
			const displayError = document.getElementById('card-errors');
			if (event.error) {
				displayError.textContent = event.error.message;
			} else {
				displayError.textContent = '';
			}
		});
	}
	/** get previously used cards */
	public getCards(): void {
		this.pmt.getCards().subscribe(res => {
			if (res != null) {
				this.cards = res;
				if (this.paymentType === 'previousCard' || this.paymentType === '') {
					this.showNewCard = false;
					this.cards.map((ele, i) => {
						if (ele['is_default'] === 1) {
							this.activeCard = ele;

						} else {
							if (i === 0) {
								this.activeCard = ele;
							}
						}
					});
				} else {
					this.showNewCard = true;
				}
			}
		}, (error) => {
			console.log(error);
			this.shared._snackbarMessage(error.error.message, 2000);
		});
	}
	//
	/** on submitting payment */
	public onSubmit(): void {
		let paymentObj: { name?: string; amount?: number, currency?: string, customerId?: string, cardId?: string, token?: string };
		if (this.activeCard) { // if previous card is used
			paymentObj = {
				name: this.paymentFg.controls.name.value,
				amount: Math.round(this.paymentFg.controls.amount.value * 100),
				currency: 'USD',
				customerId: this.activeCard.customer_id,
				cardId: this.activeCard.card_id
			}
			this.pmt.postPaymentObject(paymentObj).subscribe(res => {
				if (res.status_code === 200) {
					this.cards = res.data.cards;
					this.card.clear();
					this.paymentFg.reset();
					this.shared._snackbarMessage(res.message, 2000);
				}
			}, (error) => {
				console.log(error);
				this.shared._snackbarMessage(error.error.message, 2000);
			});

		}
		else {
			//if new card is entered
			this.pmt.stripe.createToken(this.card, { name: this.paymentFg.controls.name.value }).then(result => {
				if (result.error) {
					const errorElement = document.getElementById('card-errors');
					errorElement.textContent = result.error.message;
				} else {
					if (result.token.id) {
						paymentObj = {
							name: this.paymentFg.controls.name.value,
							amount: Math.round(this.paymentFg.controls.amount.value * 100),
							token: result.token.id
						}
						this.pmt.postPaymentObject(paymentObj).subscribe(res => {
							if (res.status_code === 200) {
								this.cards = res.data.cards;
								this.card.clear();
								this.paymentFg.reset();
								this.shared._snackbarMessage(res.message, 2000);
							}
						}, (error) => {
							console.log(error);
							this.shared._snackbarMessage(error.error.message, 2000);
						});
					}
				}
			});
		}
	}

	/** on key press while entering amount */
	public _keyPress(event: any): void {
		const pattern = /^[0-9]{0,7}(\.[0-9]{0,2})?$/;

		const char = String.fromCharCode(event.charCode)
		const target = event.target;
		const inputVal = target.value;
		const value = inputVal.substr(0, target.selectionStart) + char + inputVal.substr(target.selectionEnd);
		if (!char.match(/[0-9.]/) || !value.match(pattern)) {
			event.preventDefault();
		}
	}

	/** on select add new card or previous card */
	public paymentTypeChange(event: any): void {
		if (event.value === 'newCard') {
			this.getCards();
			this.activeCard = null;
			this.showNewCard = true;
			this.paymentType = 'newCard';
		} else {
			this.getCards();
			this.showNewCard = false;
			this.paymentType = 'previousCard';
		}
	}

	/** on changing cards listed in previous cards */
	public cardChange(card): void {
		if (!this.showNewCard) {
			this.activeCard = card;
		}
	}

	/** on removing card */
	public removeCard(card: any): void {
		if (!this.showNewCard) {
			this.pmt.deleteCard(card).subscribe(res => {
				if (res.status_code === 200) {
					this.cards = res.data;
					this.card.clear();
					this.paymentFg.reset();
					this.shared._snackbarMessage(res.message, 2000);
				}
			}, (error) => {
				console.log(error);
				this.shared._snackbarMessage(error.error.message, 2000);
			});
		}
	}

}
