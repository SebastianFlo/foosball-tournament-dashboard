import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePermissions() {
  const route = useRoute();
  const router = useRouter();
  const role = ref("");
  const show = ref<string[]>([]);
  // check access to feature if admin or team

  watch(
    () => route.query,
    (query) => {
      // console.log("role", query.role);
      // console.log("show", query.show);
      role.value = query.role?.toString().toLowerCase() || "";

      show.value =
        (typeof query.show === "string"
          ? [query.show?.toLowerCase()]
          : query.show?.map((showFeature) => showFeature!.toLowerCase())) || [];
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const canAccess = (features: string[]) => {
    return (
      role.value === "admin" ||
      !!features.find((feature) => role.value === feature.toLowerCase())
    );
  };

  const canSee = (features: string[]) => {
    // if no specifications, show all
    if (!show.value.length) {
      return true;
    }

    return !!features.find((feature) =>
      show.value.find(
        (shownFeature) => shownFeature.toLowerCase() === feature.toLowerCase()
      )
    );
  };

  const toggleShow = (features: string[]) => {
    // Check if feature already shows
    const existingShowQuery = ref(show.value);
    const normalizedFeatures = ref(
      features.map((feature) => feature.toLowerCase())
    );

    if (
      existingShowQuery.value.length === 0 &&
      normalizedFeatures.value.length > 0
    ) {
      router.push({
        path: "/",
        query: {
          ...route.query,
          show: features,
        },
      });

      return;
    }

    // Add new feature (if duplicates, remove both);
    const mappedFeature = [
      ...existingShowQuery.value,
      ...normalizedFeatures.value,
    ].reduce((acc, curr) => {
      // if exists, remove
      if (acc[curr]) {
        delete acc[curr];
      } else {
        acc[curr] = curr;
      }

      return acc;
    }, {} as any);

    const newShowFeatures = Object.keys(mappedFeature);

    router.push({
      path: "/",
      query: {
        ...route.query,
        show: newShowFeatures,
      },
    });
  };

  return {
    role,
    show,

    canAccess,
    canSee,
    toggleShow,
  };
}
