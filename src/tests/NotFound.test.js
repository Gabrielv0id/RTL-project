import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Verifica a funcionalidade do componente NotFound', () => {
  test('Verifica se a página contém um h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);

    const h2El = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(h2El).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem correta', () => {
    render(<NotFound />);

    const imgEl = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(imgEl.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
