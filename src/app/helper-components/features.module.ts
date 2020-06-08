import { NgModule } from '@angular/core';

import { FormRequestModule } from '@/helper-components/form-request/form-request.module';
import { RequestErrorsModule } from '@/helper-components/request-errors/request-errors.module';

@NgModule({
	imports: [FormRequestModule, RequestErrorsModule],
	exports: [FormRequestModule, RequestErrorsModule]
})
export class FeaturesModule {}
