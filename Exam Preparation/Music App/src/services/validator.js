export const dataValidator = (checkData) => {
    let requiredFiled = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description'
    ];
    return requiredFiled.some(x => !checkData[x])
};