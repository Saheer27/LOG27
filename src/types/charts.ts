export type PieChartsProps = {
  title: string;
  values: { name: string; value: number }[];
};

export type AreaChartsProps = {
  values: {
    month: string;
    income: number;
    expense: number;
    balance: number;
    count: number;
  }[];
};
