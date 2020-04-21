import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import emojiFlags from "emoji-flags";

const Container = styled.div`
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  margin: 15px;
  font-size: 14px;
`;

const Item = styled.div`
  padding-left: 10px;
  margin-top: 15px;
  font-size: 12px;
`;

const Production = ({ result, isMovie }) => {
  const companies = result.production_companies;
  const countries = isMovie
    ? result.production_countries
    : result.origin_country;
  return (
    <Container>
      <Tab>
        Production Companies:
        {companies.map((company) => {
          return <Item key={company.id}>{company.name}</Item>;
        })}
      </Tab>
      <Tab>
        Production Countries:
        {countries.map((country, index) => {
          return (
            <Item key={index}>
              {isMovie
                ? emojiFlags.countryCode(country.iso_3166_1).emoji
                : emojiFlags.countryCode(country).emoji}{" "}
              {isMovie ? country.name : country}
            </Item>
          );
        })}
      </Tab>
    </Container>
  );
};

export default Production;
