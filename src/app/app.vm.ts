import { injectable } from "inversify";
import * as ko from 'knockout';

/**
 * AppViewModel
 */
@injectable()
export class AppViewModel {
	public pageComponentName: KnockoutObservable<string> = ko.observable<string>();
};