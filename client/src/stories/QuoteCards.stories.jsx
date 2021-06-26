import React from "react";
import QuoteCard from "../Components/QuoteCard";

export default {
  title: "Components/QuoteCard",
  component: QuoteCard,
};

const Template = (args) => <QuoteCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  subtitle: "cryptocompare",
  history: [
    {
      time: "2021-06-26 11:52:32",
      prettyPrice: "31,161.31",
    },
    {
      time: "2021-06-26 11:53:33",
      prettyPrice: "31,218.55",
    },
    {
      time: "2021-06-26 11:54:33",
      prettyPrice: "31,233.79",
    },
    {
      time: "2021-06-26 11:55:35",
      prettyPrice: "31,236.94",
    },
    {
      time: "2021-06-26 11:56:36",
      prettyPrice: "31,257.51",
    },
  ],
};
