import { screen, act } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
  test('Se a página contém um texto com "(nome do pokemon) details, na tela"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/148');
    });

    const pokemonName = screen.getByRole('heading', {
      name: /dragonair details/i,
      level: 2,
    });

    expect(pokemonName).toBeInTheDocument();
  });
  test('Se o link não existe nos detalhes do pokémon selecinado', () => {
    const { history } = renderWithRouter(<App />);

    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    act(() => {
      history.push('/pokemon/148');
    });

    expect(linkEl).not.toBeInTheDocument();
  });

  test('Se a seção de detalhes contém um parágrafo com o resumo do pokémon selecionado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/148');
    });

    const pokemonText = screen.getByText(
      /they say that if it emits an aura from its whole body, the weather will begin to change instantly\./i,
    );

    expect(pokemonText).toBeInTheDocument();
  });
});

describe('Testando a seção de mapas que contém a localização do pokémon', () => {
  test('Se existe na seção um h2 com o texto "Game Locations of (nome do pokemon)"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/148');
    });

    const h2LocEl = screen.getByRole('heading', {
      name: /game locations of dragonair/i,
      level: 2,
    });

    const h2summ = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    expect(h2LocEl).toBeInTheDocument();
    expect(h2summ).toBeInTheDocument();
  });

  test('Se todas as localizações são mostradas', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/148');
    });

    const imgArr = screen.getAllByRole('img', {
      name: /dragonair location/i,
    });
    const firstMap = screen.getByText(/johto route 45/i);
    const secondMap = screen.getByText(/johto dragon's den/i);
    expect(imgArr[0].src).toEqual('https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(firstMap).toBeInTheDocument();
    expect(imgArr[1].src).toEqual('https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');
    expect(secondMap).toBeInTheDocument();
  });

  describe('Testando se o botão de favoritar funciona corretamente', () => {
    test('Se a página exibe um checkbox e ao clicar marca como favorito', () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/pokemon/148');
      });
      const checkbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });

      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
  });
});
