import { geometricDistribution } from './geoDis';

export const sussify = (str: string) => {
    let ret: string;

    const len = str.length;
    const splitPoint = len - geometricDistribution(0.3, (2*len)/3);

    ret = str.substring(0, splitPoint + 1);

    for (let i = ret.length - 1; i >= 0; --i) {
        ret += ret[i];
    }

    return ret;
}
