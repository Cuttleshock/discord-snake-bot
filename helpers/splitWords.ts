import * as vals from '../values';

export const splitWordlike = (str: string) => {
    return str.split(vals.splitRegex);
}
