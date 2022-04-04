import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { HeadComponent } from './shared/components/head/head.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';
import { MainComponent } from './main/main.component';
import { StreamingComponent } from './streaming/streaming.component';
import { LineChartOneComponent } from './line-chart-one/line-chart-one.component';
import { LineChartTwoComponent } from './line-chart-two/line-chart-two.component';
import { BarChartOneComponent } from './bar-chart-one/bar-chart-one.component';
import { BarChartTwoComponent } from './bar-chart-two/bar-chart-two.component';
import { DoughnutChartOneComponent } from './doughnut-chart-one/doughnut-chart-one.component';
import { DoughnutChartTwoComponent } from './doughnut-chart-two/doughnut-chart-two.component';
import { RadarChartTwoComponent } from './radar-chart-two/radar-chart-two.component';
import { RadarChartOneComponent } from './radar-chart-one/radar-chart-one.component';
import { PieChartOneComponent } from './pie-chart-one/pie-chart-one.component';
import { PieChartTwoComponent } from './pie-chart-two/pie-chart-two.component';
import { PolarChartTwoComponent } from './polar-chart-two/polar-chart-two.component';
import { PolarChartOneComponent } from './polar-chart-one/polar-chart-one.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StreamPageComponent } from './stream-page/stream-page.component';
import { ObjectdetectionComponent } from './objectdetection/objectdetection.component';

@NgModule({
  declarations: [
    SystemComponent,
    HeadComponent,
    FooterComponent,
    ScrollTopComponent,
    MainComponent,
    MainComponent,
    StreamingComponent,
    LineChartOneComponent,
    LineChartTwoComponent,
    BarChartOneComponent,
    BarChartTwoComponent,
    DoughnutChartOneComponent,
    DoughnutChartTwoComponent,
    RadarChartTwoComponent,
    RadarChartOneComponent,
    PieChartOneComponent,
    PieChartTwoComponent,
    PolarChartTwoComponent,
    PolarChartOneComponent,
    DashboardPageComponent,
    StreamPageComponent,
    ObjectdetectionComponent,
  ],
  imports: [
    SystemRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    NgChartsModule,
  ],
  bootstrap: [SystemComponent]
})
export class SystemModule { }
