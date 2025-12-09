// src/lib/api.ts
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImRhbmllbCIsImNvbXBhbnlfaWQiOjEsImVtcGxveWVlX2lkIjo1LCJ1c2VyX2ZpcnN0bmFtZSI6IkRhbmllbCIsInVzZXJfbGFzdG5hbWUiOiJZZWJvYWgiLCJ1c2VyX2VtYWlsIjoiIiwidXNlcl9waG9uZSI6bnVsbCwidXNlcl9zdGF0dXMiOiJBQ1RJVkUiLCJ1c2VyX3BpYyI6bnVsbCwidXNlcl90aHVtYiI6bnVsbCwicGFzc3dvcmRfcmVzZXQiOm51bGwsInJvbGVfdmlldyI6ZmFsc2UsInJvbGVfZWRpdCI6ZmFsc2UsImdyb3VwX3ZpZXciOmZhbHNlLCJncm91cF9lZGl0IjpmYWxzZSwiY291bnRyeSI6bnVsbCwidGltZXpvbmUiOm51bGwsInByZWZlcnJlZF9sYW5ndWFnZSI6bnVsbCwiaXNfbWFzdGVyIjpmYWxzZSwibG9ja2VkIjpmYWxzZSwidXBkYXRlZF9ieSI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwic2Vzc2lvbl9pZCI6MzAwNiwiZ3JvdXBzIjpbMiw3LDMxLDQ4LDU1XSwicm9sZXMiOlszLDIwLDgsOSwxOSwxMCwxLDE4LDZdLCJwcm9maWxlX3BpYyI6ImVtcGxveWVlcy8xL2QyNzQzZjUyLTk2NjQtNDQ1YS05NDk5LTFkNjk4MWMxYzBjOC5wbmcifQ.SKa1Q0ObZMQI9jIp0qvJG2goPLkTL6xs2RFc5K_6b5U";

const api = axios.create({
  baseURL: "https://worksync.global/api/relationship",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});


export interface ApiEmployee {
  employee_id: number;
  target: string; // name
  pic: string;
  direct_reports: number;
  indirect_reports: number;
  relationship_id:string;
  children: ApiEmployee[];
}
// src/lib/types.ts
export interface Employee {
  id: number;
  name: string;
  title: string;
  profile_pic: string;
  reports?: Employee[];
}
export interface ApiResponse {
  status: "OK";
  tree: ApiEmployee;
}


export const normalizeEmployee = (apiEmp: ApiEmployee): Employee => ({
  id: apiEmp.employee_id,
  name: apiEmp.target.trim(),
  title: apiEmp.relationship_id, 
  profile_pic: apiEmp.pic || "https://via.placeholder.com/80?text=NA",
  reports: apiEmp.children.map(normalizeEmployee),
});

export const fetchOrgChart = async (employeeId: number): Promise<Employee> => {
  const response = await api.get<ApiResponse>(`/people_chart/${employeeId}`);
  return normalizeEmployee(response.data.tree);
};
console.log(fetchOrgChart)