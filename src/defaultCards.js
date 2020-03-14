let cardsList = [
    {
        id: 1,
        title: "Bieganie",
        description: "Codzienny poranny bieg",
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
    },
    {
        id: 3,
        title: "Śniadanie",
        description: "śniadanie",
        status: 'done',
        color: '#bd8d31',
        tasks: [
            {
                id: 1,
                name: 'Zrobić',
                done: true,
            },
            {
                id: 2,
                name: 'Zjeść',
                done: true,
            },
            {
                id: 3,
                name: 'Pozmywać',
                done: true,
            }
        ]
    }
];

export default cardsList;
