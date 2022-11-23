import { differenceBy, intersectionBy } from "lodash";

export const getChangedListData = <
    T1 extends { id: string },
    T2 extends { id?: string }
>(
    list1: T1[],
    list2: T2[]
) => {
    const deletedIds = differenceBy(list1, list2, "id").map((x) => x.id);
    const addedEntries = differenceBy(list2, list1, "id");
    const updatedEntries = intersectionBy(list2, list1, "id");

    return { updatedEntries, addedEntries, deletedIds };
};
