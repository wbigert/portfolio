export interface Settings {
  formStatus: 'open' | 'closed',
  formUrl: string,
  formStartDate: Date,
  applicantGroups: {
    name: string,
    applicants: string[]
  }[],
  tryoutDays: {
    name: string,
    applicants: string[]
  }[],
}