import { getPokemon } from "../../store/actions/PokemonActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  ColorPokemon,
  ImgHome,
  NamePokemon,
  FullPageHome,
  ContainerPokemon,
  StyledLink,
  PokemonName,
  TitleHomeDiv,
  CgPokemonStyled,
  StyledSelect
} from "../../AllPages.styles";
import { useNavigate } from "react-router-dom";
import Select from "react-select";


function Searching(reducer: any) {
  const { pokemonsToList, dispatch, pokemonsDetails } = reducer;
  const [search, setSearch] = useState({});
  const [searchedPokemons, setSearchedPokemons] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonsToList.length === 1) {
      getPokemon(pokemonsToList, dispatch);
    }
  }, []);

  useEffect(() => {
    mapOptions();
  }, [pokemonsDetails]);

  const setupNavigate = (poke: any) => {
    const pokeSelecionado = pokemonsDetails.filter(
      (e: any) => e.name === poke.value
    );
    navigate(`/detail/${pokeSelecionado[0].id}`);
  };

  const mapOptions = () => {
    let newObj: any = [];
    console.log(pokemonsDetails, "pokeoke");
    const pokeOptions = pokemonsDetails.map((e: any) => {
      return { value: e.name, label: e.name };
    });
    setSearchedPokemons(pokeOptions);
  };

  return (
    <FullPageHome>
      <TitleHomeDiv>
      <CgPokemonStyled /><h1>Pokedex</h1>
      </TitleHomeDiv>

      <StyledSelect
        placeholder={'Search your pokemon'}
        options={searchedPokemons}
        onChange={(poke: any) => setupNavigate(poke)}
      />

      <ContainerPokemon>
        {pokemonsDetails.map((e: any) => {
          return (
            <ColorPokemon key={e.id} type={e.types[0].type.name}>
              <div>
                <p>
                  {e.id < 10
                    ? `#00${e.id}`
                    : e.id < 100
                    ? `#0${e.id}`
                    : `#${e.id}`}
                </p>
              </div>
              <StyledLink to={`/detail/${e.id}`}>
                <ImgHome
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png`}
                  alt="Imagem do pokemon"
                />
              </StyledLink>
              <StyledLink to={`/detail/${e.id}`}>
                <NamePokemon>
                  <PokemonName>{e.name}</PokemonName>
                </NamePokemon>
              </StyledLink>
            </ColorPokemon>
          );
        })}
      </ContainerPokemon>
    </FullPageHome>
  );
}

const mapStateToProps = (state: any) => ({
  pokemonsToList: state.pokemonReducer.pokemonsToList,
  pokemonsDetails: state.pokemonReducer.pokemonsDetails,
});

export default connect(mapStateToProps)<any>(Searching);
