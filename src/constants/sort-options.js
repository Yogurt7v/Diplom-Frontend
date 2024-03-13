import _ from "lodash";

export const SORT_OPTIONS = [
    {
      value: "priceDESC",
      label: "по цене по убыванию",
      sort: (data) => _.orderBy(data, ["price"], ["desc"]),
    },
    {
      value: "priceASC",
      label: "по цене по возрастанию",
      sort: (data) => _.orderBy(data, ["price"], ["asc"]),
    },
    {
      value: "weightASC",
      label: "по весу по возрастанию",
      sort: (data) => _.orderBy(data, ["weight"], ["asc"]),
    },
    {
      value: "weightDESC",
      label: "по весу по убыванию",
      sort: (data) => _.orderBy(data, ["weight"], ["desc"]),
    },
    {
      value: "caloriesASC",
      label: "по калорийности по возрастанию",
      sort: (data) => _.orderBy(data, ["calories"], ["asc"]),
    },
    {
      value: "caloriesDESC",
      label: "по калорийности по убыванию",
      sort: (data) => _.orderBy(data, ["calories"], ["desc"]),
    },
  ];