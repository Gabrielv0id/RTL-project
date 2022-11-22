import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

const pokemonList = [{
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
},
{
  id: 151,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '4.0',
    measurementUnit: 'kg',
  },
}];

const arrayBool = {
  65: false,
  151: false,
};

const pokemonList2 = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
},
{
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
}];

const arrayBool2 = {
  25: false,
  4: false,
  65: false,
};

describe('Testa a funcionalidade do componenete Pokedex', () => {
  test('Verifica se a página contém um h2 com o text "Encountered Pokémon"', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ arrayBool }
      />,
    );

    const h2El = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(h2El).toBeInTheDocument();
  });

  describe('testando se a funcionalidade da lista...', () => {
    test('contem um botão com o texto "Próximo Pokémon"', () => {
      renderWithRouter(
        <Pokedex
          pokemonList={ pokemonList }
          isPokemonFavoriteById={ arrayBool }
        />,
      );

      const btnEl = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(btnEl).toBeInTheDocument();
    });
    test('muda de pokémon ao clicar no botão', () => {
      renderWithRouter(
        <Pokedex
          pokemonList={ pokemonList }
          isPokemonFavoriteById={ arrayBool }
        />,
      );

      const btnEl = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(btnEl).toBeInTheDocument();

      userEvent.click(btnEl);

      const nameEl = screen.getByText(/mew/i);
      const typeEl = screen.getByTestId('pokemon-type');

      expect(nameEl).toBeInTheDocument();
      expect(typeEl).toBeInTheDocument();
    });
    test('Ao clicar no butão e estiver no ultimo pokémon volta para o primeiro', () => {
      renderWithRouter(
        <Pokedex
          pokemonList={ pokemonList }
          isPokemonFavoriteById={ arrayBool }
        />,
      );

      const btnEl = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(btnEl).toBeInTheDocument();

      userEvent.click(btnEl);
      userEvent.click(btnEl);

      const nameEl = screen.getByText(/alakazam/i);
      const typeEl = screen.getByTestId('pokemon-type');

      expect(nameEl).toBeInTheDocument();
      expect(typeEl).toBeInTheDocument();
    });
  });

  test('testa se é mostrado um pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ arrayBool }
      />,
    );

    const arrayImg = screen.getAllByRole('img');

    expect(arrayImg).toHaveLength(1);
  });

  test('testando a funcionalidade dos filtros de butões', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList2 }
        isPokemonFavoriteById={ arrayBool2 }
      />,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(filterButtons[0].innerHTML).toEqual('Electric');
    expect(filterButtons[1].innerHTML).toEqual('Fire');
    expect(filterButtons[2].innerHTML).toEqual('Psychic');
    expect(buttonAll).toBeInTheDocument();
  });
  test('Ao clicar em um filtro apenas o pokemon do filtro clicado irá aparecer', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList2 }
        isPokemonFavoriteById={ arrayBool2 }
      />,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(filterButtons[0]);

    const nameEl = screen.getByText(/pikachu/i);
    expect(nameEl).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });
  test('verifica se contém e está funcional o botão de resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList2 }
        isPokemonFavoriteById={ arrayBool2 }
      />,
    );

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const nameEl = screen.getByTestId('pokemon-name');

    expect(nameEl.innerHTML).toEqual('Pikachu');
  });
});
