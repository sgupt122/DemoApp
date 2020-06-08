import { Injectable } from "@angular/core";
import { environment } from '@environment/environment';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
   providedIn: 'root'
})
export class PaymentStripeService {
   private readonly _apiUrl = environment.apiUrl;


   public stripe = Stripe('pk_test_uZDfu9J0rDt5tLxNMoWM3qaF00fVq3fhix');
   public api_url = environment.apiUrl;
   constructor(private http: HttpClient) { }


   public postPaymentObject(object): Observable<any> {
      return this.http.post(this.api_url + '/make-payment', object);
   }

   public getCards(): Observable<any> {
      return this.http.get(this.api_url + '/get-cards');
   }

   public deleteCard(card: any): Observable<any> {
      return this.http.delete(`${this.api_url}/delete-card/${card.card_id}`);
   }

}