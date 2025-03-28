import { useTranslation } from "react-i18next";

export function getOptions() {
  const { t, i18n } = useTranslation()

  const depositOptions = [
    { label: t("apply.formLabels.depositOptions.swish"), value: "Swish" },
    { label: t("apply.formLabels.depositOptions.revolut"), value: "Revolut" },
    { label: t("apply.formLabels.depositOptions.cash"), value: "Cash" },
  ];

  const experienceOptions = [
    { value: "Casual Play only", label: t("apply.formLabels.experienceOptions.casualPlayOnly") },
    { value: "High School", label: t("apply.formLabels.experienceOptions.highSchool") },
    { value: "Played in a Club 1-2 years", label: t("apply.formLabels.experienceOptions.club1to2Years") },
    { value: "Played in a Club 2-4 years", label: t("apply.formLabels.experienceOptions.club2to4Years") },
    { value: "Played in a Club 4+ years", label: t("apply.formLabels.experienceOptions.club4plusYears") },
    { value: "None", label: t("apply.formLabels.experienceOptions.none") },
  ];

  const roles = [
    { value: "setter", label: t("apply.formLabels.roles.setter") },
    { value: "middle", label: t("apply.formLabels.roles.middle") },
    { value: "outside", label: t("apply.formLabels.roles.outside") },
    { value: "opposite", label: t("apply.formLabels.roles.opposite") },
    { value: "libero", label: t("apply.formLabels.roles.libero") },
  ];

  const roleOptions = [
    { value: "Not at all interested", label: t("apply.formLabels.roleOptions.notInterested") },
    { value: "Slightly interested", label: t("apply.formLabels.roleOptions.slightlyInterested") },
    { value: "Neutral", label: t("apply.formLabels.roleOptions.neutral") },
    { value: "Interested", label: t("apply.formLabels.roleOptions.interested") },
    { value: "Very interested", label: t("apply.formLabels.roleOptions.veryInterested") },
  ];

  const studyDurationOptions = [
    { value: "Not studying at KTH or other university", label: t("apply.formLabels.studyDurationOptions.notStudying") },
    { value: "3 months", label: t("apply.formLabels.studyDurationOptions.threeMonths") },
    { value: "6 months", label: t("apply.formLabels.studyDurationOptions.sixMonths") },
    { value: "1 year", label: t("apply.formLabels.studyDurationOptions.oneYear") },
    { value: "2+ years", label: t("apply.formLabels.studyDurationOptions.twoPlusYears") },
  ];

  const teamOptions = [
    { value: "Men's Team", label: t("apply.formLabels.teamOptions.mensTeam") },
    { value: "Women's Team", label: t("apply.formLabels.teamOptions.womensTeam") },
  ];

  const studyAtKTHOptions = [
    { value: "Yes", label: t("apply.formLabels.studyAtKTHOptions.yes") },
    { value: "No", label: t("apply.formLabels.studyAtKTHOptions.no") },
    { value: "Other", label: t("apply.formLabels.studyAtKTHOptions.other") },
  ];

  const memberThsOptions = [
    { value: "I intend to become one soon", label: t("apply.formLabels.memberThsOptions.intendToBecome") },
    { value: "Yes", label: t("apply.formLabels.memberThsOptions.yes") },
    { value: "No", label: t("apply.formLabels.memberThsOptions.no") },
  ];

  const boardPositionInterestOptions = [
    { value: "Yes", label: t("apply.formLabels.boardPositionInterestOptions.yes") },
    { value: "No", label: t("apply.formLabels.boardPositionInterestOptions.no") },
  ];

  const membershipFeeAgreementOptions = [
    { value: "Yes", label: t("apply.formLabels.membershipFeeAgreementOptions.yes") },
  ];

  const availableTimesOptions = [
    { value: "February 8th Wednesday, 21:00-22:30 GIH Hallen", label: t("apply.formLabels.availableTimesOptions.1") },
    { value: "February 10th Friday, 18:00-19:00 KTH Hallen", label: t("apply.formLabels.availableTimesOptions.2") },
    { value: "February 11th Saturday, 14:00-15:00 KTH Hallen", label: t("apply.formLabels.availableTimesOptions.3") },
  ]

  const regularOptions = [
    { value: "Yes", label: t("apply.formLabels.regularOptions.yes") },
    { value: "No", label: t("apply.formLabels.regularOptions.no") },
    { value: "Maybe", label: t("apply.formLabels.regularOptions.maybe") },
    { value: "Other", label: t("apply.formLabels.regularOptions.other") },
  ];

  const practiceFrequencyOptions = [
    { value: "Rarely", label: t("apply.formLabels.practiceFrequencyOptions.rarely") },
    { value: "Occasionally", label: t("apply.formLabels.practiceFrequencyOptions.occasionally") },
    { value: "Regularly", label: t("apply.formLabels.practiceFrequencyOptions.regularly") },
    { value: "Frequently", label: t("apply.formLabels.practiceFrequencyOptions.frequently") },
    { value: "Always", label: t("apply.formLabels.practiceFrequencyOptions.always") },
  ];

  const expectationsOptions = [
    { value: "Slight specialization (i.e work seriously on specialized role skills)", label: t("apply.formLabels.expectationsOptions.slightSpecialization") },
    { value: "Fully competitive", label: t("apply.formLabels.expectationsOptions.fullyCompetitive") },
    { value: "Social play", label: t("apply.formLabels.expectationsOptions.socialPlay") },
  ];

  const discoverySourceOptions = [
    { value: "Facebook (KTH Volleyball)", label: t("apply.formLabels.discoverySourceOptions.facebook") },
    { value: "Instagram Page", label: t("apply.formLabels.discoverySourceOptions.instagram") },
    { value: "Union day", label: t("apply.formLabels.discoverySourceOptions.unionDay") },
    { value: "A friend told me about it", label: t("apply.formLabels.discoverySourceOptions.friend") },
    { value: "Posters", label: t("apply.formLabels.discoverySourceOptions.posters") },
    { value: "THS website", label: t("apply.formLabels.discoverySourceOptions.thsWebsite") },
    { value: "THS sports", label: t("apply.formLabels.discoverySourceOptions.thsSports") },
    { value: "Other", label: t("apply.formLabels.discoverySourceOptions.other") },
  ];



  return [
    depositOptions,
    experienceOptions,
    roles,
    roleOptions,
    studyDurationOptions,
    teamOptions,
    studyAtKTHOptions,
    memberThsOptions,
    boardPositionInterestOptions,
    membershipFeeAgreementOptions,
    availableTimesOptions,
    regularOptions,
    practiceFrequencyOptions,
    expectationsOptions,
    discoverySourceOptions];
}