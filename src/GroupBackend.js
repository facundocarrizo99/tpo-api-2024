var groups = [
    {
        groupName: 'Asado',
        description: 'Asado para el cumpleaños de Santiago',
        users: [{id: 1, name: 'Santiago'}, {id: 2, name: 'Facundo'}, {id: 3, name: 'Juan'}],
        expenses: [
            { id: 1, user: 'Santiago', description: 'Carne', amount: 200, date: '2023-01-01' },
            { id: 2, user: 'Facundo', description: 'Pan y Verduras', amount: 100, date: '2023-01-02' },
            { id: 3, user: 'Facundo', description: 'Pan y Verduras', amount: 300, date: '2023-01-03' },

        ],
        arreglos: [],
    },
    {
        groupName: 'grupo 2',
        description: 'Descripción del grupo 2',
        users: [{id: 3, name: 'user3'}, {id: 4, name: 'user4'}, {id: 1, name: 'Santiago'}],
        expenses: [
            { id: 1, user: 'user3', description: 'compra 3', amount: 300, date: '2023-02-01' },
        ],
        arreglos: [],
    },
    {
        groupName: 'grupo 3',
        description: 'Descripción del grupo 3',
        users: [{id: 5, name: 'user5'}, {id: 6, name: 'user6'}],
        expenses: [
            { id: 1, user: 'user5', description: 'compra 5', amount: 500, date: '2023-03-01' },
            { id: 2, user: 'user6', description: 'compra 6', amount: 600, date: '2023-03-02' },
        ],
        arreglos: [],
    },
    // Agrega más grupos y expensas según sea necesario
];


function findGroupByName(groupName) {
    console.log('Buscando grupo con nombre:', groupName);
    return groups.find(group => group.groupName === groupName);
}

function fetchData() {
    return groups;
}

function addExpense(groupName, expense) {
    const group = findGroupByName(groupName);
    console.log('Buscando grupo con nombre arreglo:', groupName);
    if (group) {
        group.expenses.push(expense);
    }
}

function addGroup(group) {
    groups.push(group);
}

function deleteExpense(groupName, expense) {
    const group = findGroupByName(groupName);
    if (group) {
        group.expenses = group.expenses.filter(e => e !== expense);
    }
}

function deleteGroup(group) {
    groups = groups.filter(g => g !== group);
}

function addArreglo(groupName, arreglo) {
    const group = findGroupByName(groupName);

    if (group) {
        group.arreglos.push(arreglo);
    }
}

function deleteArreglo(groupName, arreglo) {
    const group = findGroupByName(groupName);
    if (group) {
        group.arreglos = group.arreglos.filter(a => a !== arreglo);
    }
}

export { groups, findGroupByName, fetchData, addGroup, addExpense, deleteGroup, deleteExpense, addArreglo, deleteArreglo };