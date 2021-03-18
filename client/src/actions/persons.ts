import { IPerson } from "../data/person";

export enum PersonsAction {
    Add,
    Remove,
    AddAll,
    RemoveAll,
    Filter
}

export interface IFilter {
    person: Partial<IPerson>
}

export interface IPersonsAction {
    type: PersonsAction,
    person?: IPerson,
    persons?: IPerson[],
    filter?: IFilter
}

export const add = (person: IPerson) => {
    return {
        type: PersonsAction.Add,
        person
    }
}

export const addAll = (persons: IPerson[]) => {
    return {
        type: PersonsAction.AddAll,
        persons
    }
}

export const remove = (person: IPerson) => {
    return {
        type: PersonsAction.Remove,
        person
    }
}

export const removeAll = (persons: IPerson[]) => {
    return {
        type: PersonsAction.RemoveAll,
        persons
    }
}

export const filter = (filter: IFilter) => {
    return {
        type: PersonsAction.Filter,
        filter
    }
}

export const actions = {
    add, remove, addAll, removeAll, filter
}
