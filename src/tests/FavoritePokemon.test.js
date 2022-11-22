import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente FavoritePokemon', () => {
  test('A página deverá renderizar uma mensagem, caso a pessoa não tenha pokémon favoritos', () => {
    const pokemonList = [];
    render(<FavoritePokemon pokemonList={ pokemonList } />);

    const textEl = screen.getByText(/no favorite pokémon found/i);

    expect(textEl).toBeInTheDocument();
  });

  test('A página deverá renderizar os pokémon favoritados', () => {
    const pokemonList = [{
      id: 65,
      name: 'Alakazam',
      type: 'Psychic',
      averageWeight: {
        value: '48.0',
        measurementUnit: 'kg',
      },
    }];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const textEl = screen.getByText(/alakazam/i);

    expect(textEl).toBeInTheDocument();
  });
});
