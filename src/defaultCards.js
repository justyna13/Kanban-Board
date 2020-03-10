let cardsList = [
    {
        id: 1,
        title: "Kot",
        description: "Nakarmić kota",
        status: 'todo',
        color: '#bd8d31',
        tasks: []
    },
    {
        id: 2,
        title: "Książka",
        description: "Przeczytać książkę",
        status: 'in-progress',
        color: '#3a7e28',
        tasks: [
            {
                id: 1,
                name: "Rozdział 1",
                done: true
            },
            {
                id: 2,
                name: "Rozdział 2",
                status: false
            },
            {
                id: 3,
                name: "Rozdział 3",
                status: false
            }
        ]
    }
];

export default cardsList;
