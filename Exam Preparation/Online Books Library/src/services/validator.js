export const dataValidator = (bookData) => {
    let requiredFiled = [
        'title',
        'description',
        'imageUrl',
        'type'
    ];
    return requiredFiled.some(x => !bookData[x])
};



