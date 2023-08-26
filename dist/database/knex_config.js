"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "src/database/in_memory_db/earth2mars_mars2earth.sqlite3", // Connect to an in-memory SQLite database
        },
        useNullAsDefault: true, // Use NULL as default for missing values
    },
};
