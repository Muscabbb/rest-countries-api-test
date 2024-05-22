import Image from "next/image";
import React from "react";

type CountryProps = {
  countryName: string;
  src: string;
  alt: string;
  population: string;
  region: string;
  capital: string;
};

function RestCountries({
  countryName,
  src,
  alt,
  population,
  region,
  capital,
}: CountryProps) {
  return (
    <div
      className="country-holder background-el flex flex-col shadow-md cursor-pointer"
      title="click to see more details"
    >
      <div className="img relative h-64">
        <Image
          src={src}
          objectFit="cover"
          alt={alt || "countryImg"}
          fill={true}
        />
      </div>

      <div className="details w-full flex flex-col p-4 gap-1">
        <h2 className=" font-bold mb-3 capitalize">{countryName}</h2>
        <span className="population">Population: {population}</span>
        <div className="region">Region: {region}</div>
        <div className="capital">Capital: {capital}</div>
      </div>
    </div>
  );
}

export default RestCountries;
