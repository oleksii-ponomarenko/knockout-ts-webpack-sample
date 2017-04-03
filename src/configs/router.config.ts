import * as $ from 'jquery';
import * as Sammy from 'sammy';

import { AppViewModel } from '../app/app.vm';
import { routes, routeTypes } from '../constants/routes';
import { injectable } from 'inversify';
import { componentNames } from '../constants/component-names';

/**
 * RouterConfig
 */
@injectable()
export class RouterConfig {
	public static sammyApp: Sammy.Application;
	public static app: AppViewModel;
	public static routeParams: any = { };

	public static goToRoute(route: string, params: Object): void {
		let hash = route.substring(route.indexOf('#'));

		for(let field in params) {
			if (params.hasOwnProperty(field)) {
				hash = hash.replace(`:${field}`, params[field]);
			}
		}

		location.hash = hash;
	}

	registerAppAndRoutes(app: AppViewModel): void {
		let application = RouterConfig.sammyApp = Sammy();

		application.get(routes.home, (context: Sammy.EventContext) => {
			app.pageComponentName(componentNames.homePage);
			RouterConfig.routeParams = context.params;
		}).get(routes.test, (context: Sammy.EventContext) => {
			app.pageComponentName(componentNames.testPage);
			RouterConfig.routeParams = context.params;
		}).get(routes.empty, (context: Sammy.EventContext) => {
			application.runRoute(routeTypes.get, routes.home);
		})
		.run();
	}
}

export { routes, routeTypes };