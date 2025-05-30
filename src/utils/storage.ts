export  const setData = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const getData = (key: string) => {
    return localStorage.getItem(key) || "";
}

export const clearValue = (key: string) => {
    localStorage.removeItem(key);
}

export const clearAll = () => {
    localStorage.clear();
}