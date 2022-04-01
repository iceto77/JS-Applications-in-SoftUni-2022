export const dataValidator = (checkData) => {
    let requiredFiled = [
        'brand',
        'model',
        'description',
        'year',
        'imageUrl',
        'price'
    ];
    return requiredFiled.some(x => !checkData[x])
};

export const positiveValue = (params) => params > 0;
