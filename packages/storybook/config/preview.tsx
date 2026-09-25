import '@gemeentenijmegen/design-tokens/dist/index.css';
import '@gemeentenijmegen/font/src/index.scss';
import './global.scss';
import { defineCustomElements } from '@gemeentenijmegen/web-components-stencil/loader/index.js';
import type { Preview, StoryContext } from '@storybook/react';

defineCustomElements();

const preview: Preview = {
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Select brand',
      defaultValue: 'nijmegen',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'nijmegen', title: 'Nijmegen' },
          { value: 'triavium', title: 'Triavium' },
          { value: 'leemkuil', title: 'De Leemkuil' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story: any, storyContext: StoryContext<any>) => {
      // Hack to make current args for a story available in the transformSource of the docs addon
      storyContext.parameters['args'] = storyContext.args;

      const brandClass =
        {
          nijmegen: 'nijmegen-theme',
          triavium: 'triavium-theme',
          leemkuil: 'leemkuil-theme',
        }[storyContext.globals.brand] ?? 'nijmegen-theme';

      return (
        <div className={`utrecht-document ${brandClass}`}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: { expanded: false },
    status: {
      statuses: {
        PRODUCTION: {
          background: '#088008',
          color: '#ffffff',
          description:
            'Used in production in a variety of situations, well tested, stable APIs, mostly patches and minor releases.',
        },
        BETA: {
          background: '#3065ee',
          color: '#ffffff',
          description:
            'Used in production in a specific situation, evolving APIs based on feedback, breaking changes are still likely.',
        },
      },
    },
  },
};

export default preview;
