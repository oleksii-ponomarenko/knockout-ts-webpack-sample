///<reference types="knockout" />
///<reference types="jqueryui" />
///<reference types="jquery" />

declare module "knockout-sortable" { }
declare namespace KnockoutSortable {
    export interface IMoveEvent<T> {
        item: T;
        sourceIndex: number;
        sourceParent: KnockoutObservableArray<T>;
        sourceParentNode: JQuery;
        targetIndex: number;
        targetParent: KnockoutObservableArray<T>;
    }

    export interface IAfterMoveEvent<T> extends IMoveEvent<T> {
    }

    export interface IBeforeMoveEvent<T> extends IMoveEvent<T> {
        cancelDrop: boolean;
    }
}
