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

    addItem(body: any, id: string): ListItem {
        const title = body.title;
        const item: ListItem = { id: id, title: title, done: false };
        this.items_.push(item);
        console.log("Add: " + JSON.stringify(item));
        return item;
    };

    deleteItem(targetId: string) {
        const index = this.items_.findIndex((item) => item.id === targetId);
        if (index >= 0) {
            const deleted = this.items_.splice(index, 1);
            console.log("Delete: " + targetId + " " + JSON.stringify(deleted[0]));
        }
    }

    setItemDone(targetId: string, done: any) {
        const index = this.items_.findIndex((item) => item.id === targetId);
        if (index >= 0) {
            const item = this.items_[index];
            if (done) {
                item.done = done === "true";
            }
            console.log("Set: " + JSON.stringify(item));
        }
    }
}