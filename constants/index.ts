export interface IListItem {
    text: string,
    id: string
}

export const testUser = {
    email: "user_email@gmail.com",
    email_verified: false,
    employee_id: 235,
    family_name: "Hampton",
    given_name: "Jeremiah",
    id: 12,
    name: "J Hampton",
    picture: "/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBA",
    preferred_username: "jhamp",
    roles: ['инженер - программист'],
    sub: "264bb918-c4f1-4160-996e-e18c90f8cf8f"
}

export const testEvents = [
    {
        "id":64,
        "user_id":51,
        "event_type_id":1,
        "start_date":"2022-11-16",
        "end_date":"2022-11-16",
        "status":2,
        "data":{
            "hr":"blabla1@icloud.com",
            "mentor":{"id":"blabla1@icloud.com","name":"HR name"},
            "dep_head":"blabla2@icloud.com"
        },
        "created_at":"2022-11-16T12:43:18.782Z",
        "updated_at":"2022-11-16T12:43:24.183Z",
        "userId":51,
        "eventTypeId":1,
        "stages":[
            {
                "id":318,
                "event_id":64,
                "start_date":"2022-11-16",
                "end_date":"2022-11-18",
                "status":2,
                "data":{
                    "jira":""
                    ,"task":"Написать приветственное письмо в группу или в почту, кратко расписать свои увлечения, хобби, опыт работы",
                    "description":"Задание 1 -  Знакомство с сотрудниками"
                },
                "created_at":"2022-11-16T12:43:18.829Z",
                "updated_at":"2022-11-16T12:43:24.223Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":319,
                "event_id":64,
                "start_date":"2022-11-21",
                "end_date":"2022-11-23",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-1",
                    "description":"Задание 2 - Знакомство с программным обеспечением и окружением"
                },
                "created_at":"2022-11-16T12:43:18.850Z",
                "updated_at":"2022-11-16T12:43:18.850Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":320,
                "event_id":64,
                "start_date":"2022-11-24",
                "end_date":"2022-11-28",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-2",
                    "description":"Задание 3 - Велком-тренинг"
                },
                "created_at":"2022-11-16T12:43:18.870Z",
                "updated_at":"2022-11-16T12:43:18.870Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":321,
                "event_id":64,
                "start_date":"2022-11-29",
                "end_date":"2022-12-05",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-3",
                    "description":"Задание 4,5 - Книга сотрудника"
                },
                "created_at":"2022-11-16T12:43:18.890Z",
                "updated_at":"2022-11-16T12:43:18.890Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":322,
                "event_id":64,
                "start_date":"2022-12-06",
                "end_date":"2022-12-26",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-4",
                    "description":"Задание 6 - Знакомство с руководителем"
                },
                "created_at":"2022-11-16T12:43:18.910Z",
                "updated_at":"2022-11-16T12:43:18.910Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":323,
                "event_id":64,
                "start_date":"2022-12-27",
                "end_date":"2023-01-16",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-4",
                    "description":"Задание 7 - Знакомство с ГД"
                },
                "created_at":"2022-11-16T12:43:18.933Z",
                "updated_at":"2022-11-16T12:43:18.933Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":324,
                "event_id":64,
                "start_date":"2023-01-17",
                "end_date":"2023-02-06",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-5",
                    "description":"Задание 8 -  Внедрение"
                },
                "created_at":"2022-11-16T12:43:18.953Z",
                "updated_at":"2022-11-16T12:43:18.953Z",
                "deleted_at":null,
                "eventId":64
            },
            {
                "id":325,
                "event_id":64,
                "start_date":"2023-02-07",
                "end_date":"2023-02-16",
                "status":1,
                "data":{
                    "jira":"https://jira.blabla.com/browse/ONBOARDING-6",
                    "description":"Задание 9 - Подведение итогов"
                },
                "created_at":"2022-11-16T12:43:18.974Z",
                "updated_at":"2022-11-16T12:43:18.974Z",
                "deleted_at":null,
                "eventId":64
            }
        ]
    }
];

export const COLORS = {
    active: '#c29734',
    inactive: '#c4b07a',
    backgroundDefault: '#0d916a',
    backgroundContainer: '#edebe1',
    borders: '#d47361',
    activeLight: '#566e34',
    inactiveLight: '#2a2b29',
    backgroundDefaultLight: '#dfebe7',
    backgroundContainerLight: '#cedbba',
    bordersLight: '#c49d54'
}
