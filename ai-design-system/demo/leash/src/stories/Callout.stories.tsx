import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout } from "../components/ui/Callout";

const meta: Meta<typeof Callout> = {
  title: "UI/Callout",
  component: Callout,
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {
    label: "Note",
    children:
      "The leash is the design system: the agent can run, but only as far as the rules let it.",
  },
};
