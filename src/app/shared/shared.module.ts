import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { InvalidInputDirective } from "./directives/invalid-input.directive";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatGridListModule, MatInputModule, MatRadioModule,
  MatSelectModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CdkTableModule} from "@angular/cdk/table";
import { SmoothHeightAnimationComponent } from './components/smooth-height-animation/smooth-height-animation.component';
import { ImageWithBorderComponent } from './components/image-with-border/image-with-border.component';
import { AnimateTextComponent } from './components/animate-text/animate-text.component';
import { ScrollerComponent } from './components/scroller/scroller.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    CdkTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    InvalidInputDirective,
    HttpModule,
    MatTooltipModule,
    MatTableModule,
    CdkTableModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    SmoothHeightAnimationComponent,
    ImageWithBorderComponent,
    AnimateTextComponent,
    ScrollerComponent,
  ],
  declarations: [
    InvalidInputDirective,
    SmoothHeightAnimationComponent,
    ImageWithBorderComponent,
    AnimateTextComponent,
    ScrollerComponent,
  ]
})
export class SharedModule { }
