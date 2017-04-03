declare const require: Function;

// Importing vendor bundle
import './vendor';

import * as ko from 'knockout';

import './components/components.barrel';
import './pages/pages.barrel';

import { AppViewModel } from './app/app.vm';
import { RouterConfig } from './configs/router.config';

import container, { injectionTypes } from './configs/injection.config';

const appViewModel = container.get<AppViewModel>(injectionTypes.app.appVM);
const routerConfig = container.get<RouterConfig>(injectionTypes.configs.routerConfig);

routerConfig.registerAppAndRoutes(appViewModel);

ko.applyBindings(appViewModel);