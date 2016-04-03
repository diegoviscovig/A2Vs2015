import {Component} from 'angular2/core';
import {NavBarComponent} from './layout/my-navbar';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FeatureADashboardComponent} from './featurea/feature.a.dashboard';
import {FeatureBDashboardComponent} from './featureb/feature.b.dashboard';

@Component({
    selector: 'my-app',
    directives: [NavBarComponent, ROUTER_DIRECTIVES],
    template: `
<div class="container-fluid">

    <my-navbar></my-navbar>

    <div class="container">
        <router-outlet></router-outlet>
    </div>
</div>
`
})

@RouteConfig([
    { path: '/featurea', name: 'FeatureA', component: FeatureADashboardComponent, useAsDefault: true },
    { path: '/featureb', name: 'FeatureB', component: FeatureBDashboardComponent }
])


export class AppComponent { }
