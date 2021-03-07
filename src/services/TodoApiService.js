import config from '../config';

export default class TodoApiService {
    static async getUsers() {
        const url = TodoApiService.buildUsersURL();
        return fetch(url).then(res => res.json());
    }

    static async getUsersItems(userId) {
        const url = TodoApiService.buildUserTodosURL(userId);
        return fetch(url).then(res => res.json());
    }

    static async postItem(itemData) {
        const url = TodoApiService.buildTodosURL();
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        }).then(res => res.json());
    }

    static async patchItem(todoId, itemData) {
        const url = TodoApiService.buildTodosURL(todoId);
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        }).then(res => res.json());
    }


    static buildUsersURL(userId = null) {
        const url = new URL(config.userTodoPath, config.TODO_API_URL);

        if(userId) return new URL(userId, url);

        return url;
    }

    static buildUserTodosURL(userId) {
        const url = new URL(config.todosPath, config.TODO_API_URL);

        url.searchParams.append('userId', userId);

        return url;
    }

    static buildTodosURL(todoId = null) {
        const url =  new URL(config.todosPath, config.TODO_API_URL);
        
        if(todoId) return url.href + `/${todoId}`;

        return url;
    }
};
