import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/ui/Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Conference" },
};

export const ComingSoon: Story = {
  args: { children: "Coming soon", variant: "coming-soon" },
};
