export function useHelpers() {
    const NestedArray = (nodes: object[]) => {
        return nodes.reduce((acc, node) => {
            if(node.children && node.children.length > 0) {
                acc.push(...NestedArray(node.children));
            }

            acc.push(node);
            return acc;
        }, [])
    }


    return {
        NestedArray
    }

}