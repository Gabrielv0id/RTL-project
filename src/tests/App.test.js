import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link da aplicação deverá possuir texto Home', () => {
    renderWithRouter(<App />);

    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLinkEl).toBeInTheDocument();
  });

  test('O segundo link da aplicação deverá possuir o texto About', () => {
    renderWithRouter(<App />);

    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLinkEl).toBeInTheDocument();
  });

  test('O terceiro link da aplicação deverá possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const favPokemonLinkEl = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    expect(favPokemonLinkEl).toBeInTheDocument();
  });
});

describe('Testa se...', () => {
  test('Ao clicar no home redireciona para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLinkEl);

    expect(history.location.pathname).toBe('/');
  });

  test('Ao clicar no about redireciona para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutLinkEl);

    expect(history.location.pathname).toBe('/about');
  });

  test('Ao clicar no Favorite Pokémon redireciona para a rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonLinkEl = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });

    userEvent.click(favPokemonLinkEl);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Ao entrar em uma URL desconhecima deverá possuir um Page Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
