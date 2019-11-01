import { Model } from "sequelize";

export default class ItemTable extends Model {
    id!: number;
    title!: string;
    done!: boolean;
}
