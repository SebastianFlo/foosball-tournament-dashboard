import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export function usePermissions() {
  const route = useRoute();
  const role = ref("");
  // check access to feature if admin or team

  watch(
    () => route.query,
    (query) => {
      console.log("role", query.role);
      role.value = query.role?.toString() || "";
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const canAccess = (features: string[]) => {
    return (
      role.value === "admin" ||
      !!features.find(
        (feature) => role.value.toLowerCase() === feature.toLowerCase()
      )
    );
  };

  return {
    role,
    canAccess,
  };
}
