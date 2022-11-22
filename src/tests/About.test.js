import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../pages';

describe('Testa se a página contém as informações sobre a pokédex', () => {
  test('A página deve conter um heading h2 com o texto "About Pokédex" ', () => {
    render(<About />);

    const h2El = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(h2El).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a pokedéx', () => {
    render(<About />);

    const arrayText = screen.getAllByText(/pokémon/i);
    expect(arrayText.length).toBe(2);
  });

  test('A página deve conter a imagem correta', () => {
    render(<About />);

    const imgEl = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgEl.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
