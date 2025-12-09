

export interface Employee {
  id: number;
  name: string;
  title: string;
  profile_pic: string;
  manager?: Employee | null;
  reports?: Employee[];
}

export const mockEmployee: Employee = {
  id: 18,
  name: "John Doe",
  title: "CEO",
  profile_pic: "https://via.placeholder.com/80?text=JD",
  manager: null,
  reports: [
    {
      id: 21,
      name: "Jane Smith",
      title: "CTO",
      profile_pic: "https://via.placeholder.com/80?text=JS",
      reports: [
        {
          id: 22,
          name: "Bob Johnson",
          title: "Senior Engineer",
          profile_pic: "https://via.placeholder.com/80?text=BJ",
          reports: [],
        },
      ],
    },
    {
      id: 25,
      name: "Mike Davis",
      title: "CFO",
      profile_pic: "https://via.placeholder.com/80?text=MD",
      reports: [],
    },
  ],
};