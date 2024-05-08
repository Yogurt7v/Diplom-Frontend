import _ from "lodash";

export const SORT_OPTIONS = [
  {
    value: "",
    label: "без сортировки",
    sort: (data) => data,
  },

  {
    value: "priceDESC",
    label: "цена по убыванию",
    sort: (data) => _.orderBy(data, ["price"], ["desc"]),
  },
  {
    value: "priceASC",
    label: "цена по возрастанию",
    sort: (data) => _.orderBy(data, ["price"], ["asc"]),
  },
  {
    value: "weightASC",
    label: "вес по возрастанию",
    sort: (data) => _.orderBy(data, ["weight"], ["asc"]),
  },
  {
    value: "weightDESC",
    label: "вес по убыванию",
    sort: (data) => _.orderBy(data, ["weight"], ["desc"]),
  },
  {
    value: "caloriesASC",
    label: "калории по возрастанию",
    sort: (data) => _.orderBy(data, ["calories"], ["asc"]),
  },
  {
    value: "caloriesDESC",
    label: "калории по убыванию",
    sort: (data) => _.orderBy(data, ["calories"], ["desc"]),
  },
];
