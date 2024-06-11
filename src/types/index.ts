interface IContact {
  id: string;
  title: string;
  value: string;
  link: string;
}

interface IOption {
  type: "bold" | "link";
  search: string;
  href?: string;
}

interface IAchievement {
  value: string;
  options: IOption[];
}

interface IKnowledgeAndInterest {
  id: string;
  title: string;
  list: { title: string; level?: string }[];
}

interface IData {
  firstName: string;
  lastName: string;
  applicationAs: string;
  imagesSrc: string;
  city: string;
  country: string;
  birthday: string;
  bornIn: string;
  companyName: string;
  currentData: string;
  companyLocation: string;
  contacts: IContact[];
  summary: {
    value: string;
    options: IOption[];
  };
  experiences: {
    startDate: string;
    endDate?: string;
    company: {
      name: string;
      href: string;
    };
    position: string;
    achievements: IAchievement[];
  }[];
  skills: {
    main: string[];
    frontend: string[];
    backend: string[];
    general_skills: string[];
  };
  educations: {
    startDate: string;
    endDate?: string;
    degree: string;
    location: string;
  }[];
  knowledgeAndInterest: IKnowledgeAndInterest[];
}

interface ILang {
  summary: string;
  experience: string;
  applicationAs: string;
  contact: string;
  birthday: string;
  address: string;
  cv: string;
  cover_letter: string;
  hierarchy: string;
  skills: string;
  main: string;
  frontend: string;
  backend: string;
  general_skills: string;
  education: string;
  knowledgeAndInterest: string;
  since: string;
}
