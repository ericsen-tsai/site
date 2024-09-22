import {
  pgTable,
  serial,
  varchar,
  foreignKey,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const nodes = pgTable("nodes", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
});

export const fileContents = pgTable(
  "file_contents",
  {
    nodeId: integer("node_id").primaryKey().notNull(),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      fileContentsNodeIdNodesIdFk: foreignKey({
        columns: [table.nodeId],
        foreignColumns: [nodes.id],
        name: "file_contents_node_id_nodes_id_fk",
      }),
    };
  }
);

export const children = pgTable(
  "children",
  {
    parentId: integer("parent_id").notNull(),
    childId: integer("child_id").notNull(),
  },
  (table) => {
    return {
      childrenParentIdNodesIdFk: foreignKey({
        columns: [table.parentId],
        foreignColumns: [nodes.id],
        name: "children_parent_id_nodes_id_fk",
      }),
      childrenChildIdNodesIdFk: foreignKey({
        columns: [table.childId],
        foreignColumns: [nodes.id],
        name: "children_child_id_nodes_id_fk",
      }),
    };
  }
);
