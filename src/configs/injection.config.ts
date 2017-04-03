import { Container } from 'inversify';
import injectionTypes from '../constants/injection-types';
import { HomePageViewModel } from '../pages/pages.barrel';
import { RouterConfig } from './router.config';
import { AppViewModel } from "../app/app.vm";
import { ITestService } from "../services/interfaces/service-interfaces.barrel";
import { TestService } from "../services/services.barrel";
import { ITestResource } from "../resources/interfaces/resource-interfaces.barrel";
import { TestResource } from "../resources/resources.barrel";

const container = new Container();

// Global bindings
container.bind<AppViewModel>(injectionTypes.app.appVM).to(AppViewModel);
container.bind<RouterConfig>(injectionTypes.configs.routerConfig).to(RouterConfig);

// Services
container.bind<ITestService>(injectionTypes.services.testService).to(TestService);

// Resources
container.bind<ITestResource>(injectionTypes.resources.testResource).to(TestResource);

export default container;
export { injectionTypes };