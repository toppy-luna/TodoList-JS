import pg from "pg";

export default class db {
    private dbUrl: string = "postgres://dev:secret@localhost:5432/my_local_db";
    private queryString: string = "SELECT * FROM test_table";
    private pool: any = {};

    connect() {
        console.log("--- connect to :", this.dbUrl);
        this.pool = new pg.Pool({
            connectionString: this.dbUrl
        });
    }

    select() {
        this.pool.query(this.queryString)
            .then((result: any) => {
                console.log("--- query Success", this.queryString);
                if (result.rows) {
                    result.rows.forEach((row: any, index: any) => {
                        console.log(index + 1, row);
                    });
                }
            })
            .catch((error: any) => {
                console.log("--- query Failure", error);
            });
    }

    end() {
        console.log("--- end");
        this.pool.end();
    }
}