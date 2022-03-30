export const dataValidator = (theaterData) => {
    let requiredFiled = [
        'title',
        'date',
        'author',
        'imageUrl',
        'description'
    ];
    return requiredFiled.some(x => !theaterData[x])
};
