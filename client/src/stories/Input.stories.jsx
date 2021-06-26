import React from "react";
import Input from "../Components/Input";

export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "firstName",
  placeholder: "First name",
};

export const InitialValue = Template.bind({});

InitialValue.args = {
  name: "completeName",
  initialValue: "Mariano Alvizouri",
};
