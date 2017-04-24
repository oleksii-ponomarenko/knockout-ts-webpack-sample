import { HomePageObject } from "../../nightwatch/page-objects/home.page-object";

export interface PageObjects {
    HomePageObject: () => HomePageObject;
}

export interface NightWatchCustomPageObjects {
    page: PageObjects;
}


