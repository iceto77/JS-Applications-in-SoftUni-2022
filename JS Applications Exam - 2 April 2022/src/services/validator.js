export const dataValidator = (checkData) => {
    let requiredFiled = [
        'name',
        'breed',
        'age',
        'weight',
        'image'
    ];
    return requiredFiled.some(x => !checkData[x])
};
