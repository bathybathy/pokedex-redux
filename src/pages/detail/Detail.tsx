import { getPokemon } from "../../store/actions/PokemonActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ImgHome } from "../../AllPages.styles";
import imgPokeball from "../../images/Pokeball.png";
import axios from "axios";
import {
  AllInfoESpan,
  ColorDetail,
  DivProgressStats,
  DivType,
  ImgDetail,
  ImgPokeball,
  InfoBarraHorizontal,
  InfoDetailContainer,
  InfoDetailDescript,
  InfoDetailText,
  InfoESpan,
  InfoESpanSemBorda,
  LinkArrow,
  TitleDetail,
} from "./Detail.styles";

function Detail(reducer: any) {
  const { pokemonsToList, dispatch, pokemonsDetails } = reducer;
  const { id } = useParams();
  const [pokemonById, setPokemonById] = useState([]);
  const [description, setDescription] = useState<string | null>("");

  useEffect(() => {
    if (pokemonsDetails.length < 1) {
      getPokemon(pokemonsToList, dispatch);
    }
    getPokemonById();
  }, []);

  const getPokemonById = () => {
    const arrPokemonById = pokemonsDetails.filter((e: any) => {
      if (e.id === Number(id)) {
        getDescriptionPokemon(e.id);
        return e;
      }
      return null;
    });
    setPokemonById(arrPokemonById);
  };

  const getDescriptionPokemon = async (id: string | number) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      setDescription(data.flavor_text_entries[10].flavor_text);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(pokemonById);

  return (
    <div>
      {pokemonById.map((poke: any) => {
        return (
          <ColorDetail type={poke.types[0].type.name} key={poke.id}>
            <TitleDetail>
              <LinkArrow to="/">
                <FaArrowLeft />
              </LinkArrow>
              <h1>{poke.name}</h1>
              <p>
                {poke.id < 10
                  ? `#00${poke.id}`
                  : poke.id < 100
                  ? `#0${poke.id}`
                  : `#${poke.id}`}
              </p>
            </TitleDetail>
            <div>
              <ImgPokeball src={imgPokeball} />
              <ImgDetail
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                alt="Imagem do pokemon"
              />
            </div>
            <InfoDetailContainer>
              <DivType type={poke.types[0].type.name}>
                <p>{poke.types[0].type.name}</p>
                <h2>About</h2>
              </DivType>
              <InfoDetailDescript>
                <AllInfoESpan>
                  <InfoESpan>
                    <p>{poke.weight} kg</p>
                    <span>Weight</span>
                  </InfoESpan>

                  <InfoESpan>
                    <p>{poke.height} kg</p>
                    <span>Height</span>
                  </InfoESpan>

                  <InfoESpanSemBorda>
                    {poke.abilities.map((ability: any) => {
                      return <p>{ability.ability.name}</p>;
                    })}
                    <span>Moves</span>
                  </InfoESpanSemBorda>
                </AllInfoESpan>
                <p>{description}</p>
              </InfoDetailDescript>
              <h2>Base Stats</h2>
              <InfoDetailText>
                <div>
                  <p>HP</p>
                  <p>ATK</p>
                  <p>DEF</p>
                  <p>SATK</p>
                  <p>SDEF</p>
                  <p>SPD</p>
                </div>
                <div>
                  {poke.stats.map((e: any) => {
                    return <p>{e.base_stat}</p>;
                  })}
                </div>
                <InfoBarraHorizontal>
                  {poke.stats.map((e: any) => {
                    return (
                      <DivProgressStats
                        percent={`${e.base_stat}`}
                      ></DivProgressStats>
                    );
                  })}
                </InfoBarraHorizontal>
              </InfoDetailText>
            </InfoDetailContainer>
          </ColorDetail>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  pokemonsToList: state.pokemonReducer.pokemonsToList,
  pokemonsDetails: state.pokemonReducer.pokemonsDetails,
});

export default connect(mapStateToProps)<any>(Detail);
