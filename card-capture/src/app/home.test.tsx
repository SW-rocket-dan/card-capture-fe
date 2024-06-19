import { render, screen } from '@testing-library/react';

import Home from '@/app/Home';

describe('<Home />', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />);

    const home = screen.getByText('Home');
  });
});
