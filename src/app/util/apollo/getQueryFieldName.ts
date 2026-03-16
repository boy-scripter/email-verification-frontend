import { DocumentNode } from "graphql";

export function getQueryFieldName(query: DocumentNode) {
  const def: any = query.definitions[0];
  return def.selectionSet.selections[0].name.value;
}