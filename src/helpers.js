const groups = [
    {
        name: 'grupo 1',
        description: 'Descripción del grupo 1',
        users: ['user1', 'user2'],
        expenses: [
            { user: 'user1', description: 'compra 1', amount: 100, date: '2023-01-01' },
            { user: 'user2', description: 'compra 2', amount: 200, date: '2023-01-02' },
        ],
    },
    {
        name: 'grupo 2',
        description: 'Descripción del grupo 2',
        users: ['user3', 'user4'],
        expenses: [
            { user: 'user3', description: 'compra 3', amount: 300, date: '2023-02-01' },
            { user: 'user4', description: 'compra 4', amount: 400, date: '2023-02-02' },
        ],
    },
    {
        name: 'grupo 3',
        description: 'Descripción del grupo 3',
        users: ['user5', 'user6'],
        expenses: [
            { user: 'user5', description: 'compra 5', amount: 500, date: '2023-03-01' },
            { user: 'user6', description: 'compra 6', amount: 600, date: '2023-03-02' },
        ],
    },
    // Agrega más grupos y expensas según sea necesario
];

function findGroupByName(groupName) {
    return groups.find(group => group.name === groupName);
}

function fetchData() {
    // Implementa la lógica para obtener los datos
    return groups;
}

function deleteItem(groupName, expenseIndex) {
    const group = findGroupByName(groupName);
    if (group) {
        group.expenses.splice(expenseIndex, 1);
    }
}

export { groups, findGroupByName, fetchData, deleteItem };