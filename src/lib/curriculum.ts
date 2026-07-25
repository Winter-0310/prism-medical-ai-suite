export type YearKey = "1" | "2" | "3" | "4" | "5";

export interface YearInfo {
  key: YearKey;
  title: string;
  subtitle: string;
  cover: string;
  modules: string[];
  subjects: string[];
}

export const YEARS: Record<YearKey, YearInfo> = {
  "1": {
    key: "1",
    title: "Year 1",
    subtitle: "Basic Human Body · Molecular DNA",
    cover: "from-emerald-900 via-teal-900 to-slate-950",
    modules: ["Foundation", "MSK-1", "Hematology & Immunity", "CVS-1", "Resp-1"],
    subjects: ["Anatomy & Histology", "Physiology", "Biochemistry", "Behavioral Sciences", "Research & Ethics"],
  },
  "2": {
    key: "2",
    title: "Year 2",
    subtitle: "Organ Systems · Neuro-Anatomical Brain",
    cover: "from-indigo-900 via-emerald-900 to-slate-950",
    modules: ["GIT-2", "Renal & Excretory", "Endocrine & Reproduction", "CNS-1", "Special Senses"],
    subjects: ["Gross & Neuroanatomy", "Embryology & Histology", "Medical Physiology", "Medical Biochemistry"],
  },
  "3": {
    key: "3",
    title: "Year 3",
    subtitle: "Laboratory · Microscopic Microbiology",
    cover: "from-lime-900 via-emerald-900 to-slate-950",
    modules: ["General Pathology", "Microbiology", "General Pharmacology", "Forensic Medicine", "Community Medicine"],
    subjects: ["Pathology", "Pharmacology", "Forensic Medicine", "Community Medicine", "Clinical Foundation"],
  },
  "4": {
    key: "4",
    title: "Year 4",
    subtitle: "Specialized Diagnostics · Eye-ENT Sensory",
    cover: "from-cyan-900 via-teal-900 to-slate-950",
    modules: ["Special Pathology", "Ophthalmology", "ENT", "MSK-2 & Dermatology", "CNS-2 & Psychiatry"],
    subjects: ["Ophthalmology", "ENT", "Special Pathology", "Community & Family Medicine", "Orthopedics", "Dermatology"],
  },
  "5": {
    key: "5",
    title: "Year 5",
    subtitle: "Clinical Ward · Stethoscope & Bedside Hospital",
    cover: "from-emerald-800 via-slate-900 to-slate-950",
    modules: ["Medicine & Allied", "Surgery & Allied", "Paediatrics", "Obs/Gynae"],
    subjects: ["General Medicine", "General Surgery", "Paediatrics", "Obstetrics & Gynaecology", "Clinical TOACS / OSCE Stations"],
  },
};

export const YEAR_KEYS: YearKey[] = ["1", "2", "3", "4", "5"];