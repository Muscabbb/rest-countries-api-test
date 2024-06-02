"use client";
import { Suspense, useEffect, useState } from "react";
import Filter from "./Components/filter";
import RestCountries from "./Components/countries/restCountries";
import Link from "next/link";
import CountriesLoading from "./loading";
import axios from "axios";
import RegionFiltering from "./Components/regionFiltering";
import NavBar from "./Components/navbar";

type FilteredData = {
  namesOfCountries: string[];
  countriesRegion: string[];
  countryBorders: string[];
};

const filteredData: FilteredData = {
  namesOfCountries: [],
  countriesRegion: [],
  countryBorders: [],
};

let allCountries: any;
let filteredCountriesData: any;

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  const regions = new Set(filteredData.countriesRegion);

  useEffect(() => {
    //Fetching data
    const apiCall = async () => {
      const data = await axios("/data.json");

      setData(data.data);
    };
    apiCall();
  }, []);

  filteredCountriesData = filteredCountries(data, search, region);

  data.forEach((country: any) => {
    filteredData.namesOfCountries.push(country.name);
    filteredData.countriesRegion.push(country.region);
    filteredData.countryBorders.push(country.borders);
  });

  function handleOnchange(value: string) {
    setSearch(value.toLowerCase());
  }

  const handleClick = (event: any) => {
    setRegion(event.target.innerHTML);
  };
  //Countries Data to display
  const countries = () => {
    let results: any;
    if (region === "" && search === "") {
      results = data
        .sort(() => Math.random() - 0.5)
        .map((country: any) => {
          return (
            <Link key={country.name} href={`Country/${country.name}`}>
              <RestCountries
                key={country.name}
                countryName={country.name}
                src={country.flag}
                alt={`${country.name} image`}
                population={country.population}
                region={country.region}
                capital={country?.capital}
              />
            </Link>
          );
        });
    } else if (region || search) {
      // returning the condition match countries
      results = filteredCountriesData.map((country: any) => {
        return (
          <Link key={country.name} href={`Country/${country.name}`}>
            <RestCountries
              key={country.name}
              countryName={country.name}
              src={country.flag}
              alt={`${country.name} image`}
              population={country.population}
              region={country.region}
              capital={country?.capital}
            />
          </Link>
        );
      });
    }
    allCountries = results;
  };

  countries();

  const handleTheme = () => {
    const otherTheme = theme === "light" ? "dark" : "light";
    setTheme(otherTheme);
    document.body.classList.toggle("dark");
  };

  const countryLoading = <CountriesLoading />;

  return (
    <>
      <NavBar theme={theme} handleTheme={handleTheme} />
      <div className="container mt-[80px] mx-auto flex flex-col gap-8 items-center">
        <div className="w-full flex flex-col items-start py-5 px-3 md:px-0 gap-2 md:flex-row md:justify-between  md:items-center bg-transparent">
          <Filter handleOnchange={handleOnchange} />
          <RegionFiltering handleClick={handleClick} regions={regions} />
        </div>

        <Suspense fallback={countryLoading}>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allCountries}
          </div>
        </Suspense>
      </div>
    </>
  );
}

function filteredCountries(data: any, search: string, region: string) {
  let templateData = data;

  if (region) {
    templateData = templateData.filter(
      (country: any) => country.region === region
    );
  }

  if (search) {
    templateData = templateData.filter((country: any) => {
      const countryName = country.name.toLowerCase();
      if (countryName.includes(search)) {
        return country;
      }
    });
  }

  return templateData;
}
