import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { environment } from '@environment/environment';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ErrorInterceptor } from '@/_helpers';
import { JwtInterceptor } from '@/_helpers';
import { AppStoreModule } from '@/store/store.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CustomFormsModule,
		TranslateModule.forRoot(),
		FormsModule,
		// Material moment date module
		MatMomentDateModule,

		// Material
		MatButtonModule,
		MatIconModule,
		MatSnackBarModule,

		NgxWebstorageModule.forRoot(),

		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			name: 'Charcoal - Lead Management',
			maxAge: 25,
			logOnly: environment.production
		}),

		// Fuse modules
		FuseModule.forRoot(fuseConfig),
		FuseProgressBarModule,
		FuseSharedModule,
		FuseSidebarModule,
		FuseThemeOptionsModule,

		// App modules
		LayoutModule,
		AppStoreModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		AppRoutingModule,
		SharedModule
	],
	providers: [
		Title,
		ErrorInterceptor,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
