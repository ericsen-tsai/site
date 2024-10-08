import { relations } from "drizzle-orm/relations";
import { nodes, fileContents, children } from "./schema";

export const fileContentsRelations = relations(fileContents, ({one}) => ({
	node: one(nodes, {
		fields: [fileContents.nodeId],
		references: [nodes.id]
	}),
}));

export const nodesRelations = relations(nodes, ({many}) => ({
	fileContents: many(fileContents),
	children_parentId: many(children, {
		relationName: "children_parentId_nodes_id"
	}),
	children_childId: many(children, {
		relationName: "children_childId_nodes_id"
	}),
}));

export const childrenRelations = relations(children, ({one}) => ({
	node_parentId: one(nodes, {
		fields: [children.parentId],
		references: [nodes.id],
		relationName: "children_parentId_nodes_id"
	}),
	node_childId: one(nodes, {
		fields: [children.childId],
		references: [nodes.id],
		relationName: "children_childId_nodes_id"
	}),
}));