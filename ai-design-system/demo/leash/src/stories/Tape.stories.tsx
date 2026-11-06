import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tape } from "../components/ui/Tape";

const meta: Meta<typeof Tape> = {
  title: "UI/Tape",
  component: Tape,
};

export default meta;
type Story = StoryObj<typeof Tape>;

export const Default: Story = {
  args: { children: "Writing", tilt: 0 },
};
