// Locale
import { Translate } from './locale/translate';

// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

// Toast
import { ToastrModule } from 'ngx-toastr';

// zMaterial
import {
    ZModule,
    ZModalModule,
    ZMenuModule,
    ZFormModule,
    ZReportModule,
    ZReportBuilderModule,
    ZTranslateService
} from 'zmaterial';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { CustomPaginator } from './providers';
import { ShoppingService } from './services/shopping.service';


@NgModule({
    declarations: [],
    imports: [
        // Angular
        CommonModule,

        // Http
        HttpClientModule,

        // Flex Layout
        FlexLayoutModule,

        // Forms
        ReactiveFormsModule,
        FormsModule,

        // Angular Material
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatStepperModule,
        MatGridListModule,
        MatSnackBarModule,
        MatBadgeModule,

        // Toast
        ToastrModule.forRoot(),

        // zMaterial
        ZModule.forRoot({
          languageData: Translate
        }),
        ZModalModule,
        ZMenuModule,
        ZFormModule,
        ZReportModule,
        ZReportBuilderModule
    ],
    exports: [
        // Flex Layout
        FlexLayoutModule,

        // Forms
        ReactiveFormsModule,
        FormsModule,

        // Angular Material
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatGridListModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatBadgeModule,

        // Toast
        ToastrModule,

        // zMaterial
        ZModule,
        ZModalModule,
        ZMenuModule,
        ZFormModule,
        ZReportModule,
        ZReportBuilderModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      AuthService,
      ApiService,
      ShoppingService,
      { provide: MatPaginatorIntl, useFactory: CustomPaginator, deps: [ZTranslateService] }
    ]
})
export class GlobalModule { }
