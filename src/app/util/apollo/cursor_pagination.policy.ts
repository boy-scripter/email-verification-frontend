export function createCursorPaginationPolicy(
  keyArgs: any = ["input", ["sortField", "sortDirection"]]
) {
  return {
    keyArgs,

    merge(existing: any, incoming: any, { args }: any) {

      // First page or refetch → replace list
      if (!args?.input?.after) {
        return incoming;
      }

      // Next pages → append edges
      return {
        ...incoming,
        edges: [
          ...(existing?.edges || []),
          ...(incoming?.edges || [])
        ]
      };
    },

    read(existing: any) {
      return existing;
    }
  };
}