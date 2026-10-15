import type { Preview } from '@storybook/nextjs-vite'
import '../rm-style/theme.css'
import '../app/style-registry.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="style-nova">
        <Story />
      </div>
    ),
  ],
  parameters: {
    options: {
      // RM Kit first, then everything else in its default order.
      storySort: {
        order: ['RM Kit', '*'],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;