import * as vals from '../values';

export const splitWordlike = (str: string): Array<string> => {
    return str.split(vals.splitRegex);
}
