export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function updateIsConnected(friends, data) {
    return friends?.map((f) => {
        if (f.id == data.UserID) {
            f.IsConnected = data.IsConnected;
            return f;
        } else {
            return f;
        }
    })
}