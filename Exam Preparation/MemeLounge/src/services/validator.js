export const dataValidator = (checkData) => {
    let requiredFiled = [
        'title',
        'description',
        'imageUrl'
    ];
    return requiredFiled.some(x => !checkData[x])
};

export const userValidator = (checkData) => {
    let requiredFiled = [
        'username',
        'email',
        'password',
        'gender'
    ];
    return requiredFiled.some(x => !checkData[x])
};
