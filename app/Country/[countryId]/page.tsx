"use client";
import { useEffect, useState } from "react";
import NavBar from "@/app/Components/navbar";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

type Theme = "light" | "dark";
export default function CountryDetails({
  params,
}: {
  params: { countryId: string };
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [data, setData] = useState([]);
  const [currentCountry, setCurrentCountry] = useState<any>([]);

  useEffect(() => {
    //Fetching data
    const apiCall = async () => {
      const data = await axios("/data.json");
      const decodedText = decodeURIComponent(params.countryId);

      setData(data.data);
      const currentCountryData = data.data.filter(
        (country: any) => country.name === decodedText
      );

      setCurrentCountry(currentCountryData);
    };
    apiCall();
  }, [params.countryId]);

  const handleTheme = () => {
    const otherTheme = theme === "light" ? "dark" : "light";
    setTheme(otherTheme);
    document.body.classList.toggle("dark");
  };

  const allBorders = data.map((country: any) => {
    if (currentCountry[0]?.borders.includes(country?.alpha3Code)) {
      return (
        <Link key={country?.name} href={`${country?.name}`}>
          <button className="background-el font-light py-1 rounded px-5 text-center">
            {country?.name}
          </button>
        </Link>
      );
    }
  });

  return (
    <main>
      <NavBar theme={theme} handleTheme={handleTheme} />
      <section className="container mt-[80px] mx-auto flex flex-col gap-8">
        <Link
          href={"/"}
          className="background-el py-3 flex items-center gap-4  w-32 opacity-75 hover:opacity-100 capitalize rounded justify-center"
        >
          <span>
            <FaArrowLeftLong />
          </span>
          Back
        </Link>
        <section className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="img flex basis-2/5">
            <img src={currentCountry[0]?.flag} alt="img" />
          </div>
          <section className="details basis-1/2">
            <section className="text flex flex-col md:flex-row md:items-center gap-1 md:gap-0 md:justify-between">
              <div className="l-side flex flex-col gap-1 md:basis-2/5">
                <h1 className=" font-bold mb-4 text-2xl mt-4 md:mt-0">
                  {currentCountry[0]?.name}
                </h1>
                <p className="capitalize">
                  Native Name:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.nativeName}
                  </span>
                </p>
                <p className="capitalize">
                  population:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.population}
                  </span>
                </p>
                <p className="capitalize">
                  region:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.region}
                  </span>
                </p>
                <p className="capitalize">
                  sub region:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.subRegion}
                  </span>
                </p>
                <p className="capitalize">
                  capital:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.capital}
                  </span>
                </p>
              </div>
              <div className="r-side flex flex-col gap-1 md:basis-2/5">
                <p className="capitalize">
                  top level domain:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.topLevelDomain}
                  </span>
                </p>
                <p className="capitalize">
                  currencies:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.currencies
                      .map((currency: any) => currency.name)
                      .join(",")}
                  </span>
                </p>
                <p className="capitalize">
                  languages:{" "}
                  <span className=" font-light">
                    {currentCountry[0]?.languages
                      .map((languages: any) => languages.name)
                      .join(",")}
                  </span>
                </p>
              </div>
            </section>
            <section className="btn flex items-center gap-3 flex-wrap">
              <h3>Border Countries: </h3>
              {allBorders}
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
