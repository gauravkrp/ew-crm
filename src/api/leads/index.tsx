import qs from "qs";
import { apiInstance } from "..";

const LeadsTable = "/items/student_leads";

export function getLeads(params: any = {}) {
  const { page = 1, limit = 12, filters, search } = params || {};
  const query = qs.stringify(
    {
      fields: "*", // "*.*",
      filter: {
        // status: { _eq: "published" },
      },
      meta: "*",
      limit,
      page,
    },
    {
      encodeValuesOnly: true,
    }
  );
  return apiInstance.get(`${LeadsTable}?${query}`);
}
