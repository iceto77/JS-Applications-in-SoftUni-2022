export const dataValidator = (checkData) => {
    let requiredFiled = [
        'title',
        'category',
        'maxLevel',
        'imageUrl',
        'summary'
    ];
    return requiredFiled.some(x => !checkData[x])
};
