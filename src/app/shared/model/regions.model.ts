export interface Region {
    nom: string;
    code: string;
    _score: number;
}

export function instanceOfRegion(object: any): object is Region{
    return 'nom' in object && 'code' in object && '_score' in object;
}