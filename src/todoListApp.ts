export interface ListItem {
    id: string;
    title: string;
    done: boolean;
}

export class TodoListApp {
    items_: ListItem[];

    constructor() {
        this.items_ = [];
    };

    getListAll(): ListItem[] {
        console.log("Get: " + JSON.stringify(this.items_));
        return this.items_;
    }
}