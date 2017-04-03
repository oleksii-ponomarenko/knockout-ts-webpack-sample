const injectionTypes = {
	pages: {
		home: Symbol('home')
	},
	configs: {
		routerConfig: Symbol('routerConfig')
	},
	app: {
		appVM: Symbol('appVM')
	},
	services: {
		testService: Symbol('testService')
	},
	resources: {
		testResource: Symbol('testResource')
	}
};

export default injectionTypes;