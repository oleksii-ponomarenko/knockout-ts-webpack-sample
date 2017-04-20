import { Container } from 'inversify';
import injectionTypes from '../constants/injection-types';
import { HomePageViewModel } from '../pages/pages.barrel';
import { RouterConfig } from './router.config';
import { AppViewModel } from "../app/app.vm";
import { ITestService, ICorrectnessService, IAssessmentService } from "../services/interfaces/service-interfaces.barrel";
import { TestService, AssessmentService, CorrectnessService } from "../services/services.barrel";
import { ITestResource, IAssessmentResource } from "../resources/interfaces/resource-interfaces.barrel";
import { TestResource, AssessmentResource } from "../resources/resources.barrel";

const container = new Container();

// Global bindings
container.bind<AppViewModel>(injectionTypes.app.appVM).to(AppViewModel);
container.bind<RouterConfig>(injectionTypes.configs.routerConfig).to(RouterConfig);

// Services
container.bind<ITestService>(injectionTypes.services.testService).to(TestService);
container.bind<IAssessmentService>(injectionTypes.services.assessmentService).to(AssessmentService);
container.bind<ICorrectnessService>(injectionTypes.services.correctnessService).to(CorrectnessService);

// Resources
container.bind<ITestResource>(injectionTypes.resources.testResource).to(TestResource);
container.bind<IAssessmentResource>(injectionTypes.resources.assessmentResource).to(AssessmentResource);

export default container;
export { injectionTypes };