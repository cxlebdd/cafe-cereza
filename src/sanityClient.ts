import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ci1bgwil",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
