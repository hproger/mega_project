import {observable} from 'mobx';

export interface IMegaStore {
    products: {name: string}[];
    elements: {title: string, dataName:string, dataComponent: string}[];
}

export class MegaStore implements IMegaStore {
    @observable
    products = [
        {name: "Заголовок 1"},
        {name: "Заголовок 2"},
        {name: "Заголовок 3"},
        {name: "Заголовок 4"},
    ];

    @observable
    elements = [];
}