import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'GroupBy'
})

export class GroupByPipe implements PipeTransform {

    transform(collection: Array<any>, property: string): Array<any> {
        if (!collection) {
            return null;
        }
        const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }
            return previous;
        }, {});
        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({
            key, value: groupedCollection[key]
        }));
    }
}
