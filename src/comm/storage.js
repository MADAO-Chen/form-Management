export const Storage = {
    get(name) {
        return localStorage.getItem(name);
    },
    set(name, val) {
        localStorage.setItem(name, val);
    },
    remove(name){
        localStorage.removeItem(name);
    }
};




