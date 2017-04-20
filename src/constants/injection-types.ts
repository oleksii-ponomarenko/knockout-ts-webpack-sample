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
		testService: Symbol('testService'),
		assessmentService: Symbol('assessmentService'),
		correctnessService: Symbol('correctnessService')
	},
	resources: {
		testResource: Symbol('testResource'),
		assessmentResource: Symbol('assessmentResource')
	}
};

export default injectionTypes;