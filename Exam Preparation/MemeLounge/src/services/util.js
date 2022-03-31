export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
};

export const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

export const clearUser = () => {
    localStorage.removeItem('user');
};

export const getToken = () => getUser()?.accessToken;