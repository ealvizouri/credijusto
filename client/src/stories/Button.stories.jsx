import React from "react";
import Button from "../Components/Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Submit</Button>;

export const Primary = Template.bind({});

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {},
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
