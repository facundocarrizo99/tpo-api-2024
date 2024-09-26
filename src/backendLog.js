const users = [
    {
        name: 'Facu',
        email: 'facu@gmail.com',
        password: '1',
    },
    {
        name: 'Santi',
        email: 'santi@gmail.com',
        password: '1',
    },
]

function findUser(users, searchValue) {
    return users.find(user => user.name === searchValue || user.email === searchValue);
}

function createUser(newUser) {
    users.push(newUser);
    console.log("Usuario creado exitosamente:", newUser);
    return newUser; 
}

export { users, findUser, createUser };