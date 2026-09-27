import TreeParcelsScreen from "@/components/TreeParcelsScreen";
import { TreeId } from "@/types";
import { useLocalSearchParams } from "expo-router";

export default function FruitTreeParcelsRoute() {
  const { treeId } = useLocalSearchParams<{ treeId: string }>();
  const resolvedTreeId: TreeId = treeId === "orange" ? "orange" : "olive";

  return <TreeParcelsScreen treeId={resolvedTreeId} />;
}
