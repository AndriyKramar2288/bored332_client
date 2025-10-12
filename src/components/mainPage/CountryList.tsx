import type { BasicCountry } from "../../services/dto";
import { ExpandingButton } from "./ExpandingButton";

interface CountryListProps {
  countries: BasicCountry[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-[#7575754c] pb-5">
      {countries.map((country) => (
        <div
          key={country.id}
          className="flex justify-center mt-5"
        >
            <div className="flex shadow-gray-700 shadow-md">
              <div className="flex items-center bg-searcher p-4">
                <img
                src={country.flagSrc}
                alt={`${country.name} flag`}
                className="w-10 h-10 object-cover shadow-lg rounded-lg mr-2"
                />
                <h2 className="text-lg font-semibold text-gray-300">
                    {country.name}
                </h2>
              </div>

              <div className="bg-red p-4 shadow-md hover:shadow-lg duration-300 flex">
                {/* Laws Button */}
                <ExpandingButton
                displayNumber={country.lawCount}
                className="mr-3"
                style="laws"
                iconSrc="https://www.svgrepo.com/show/505174/community-corrections-bureau.svg"
                >
                    <div className="p-3 flex flex-col gap-2 bg-gray-200 rounded-sm shadow-sm shadow-black m-1.5">
                        <h4 className="font-semibold text-lg">Закони ({country.lawCount})</h4>
                        <ul className="list-disc list-inside text-sm max-h-40 overflow-auto">
                        {country.implementations.map((impl) => (
                            <li key={impl.id}>{impl.law.text.slice(0, 50)}...</li>
                        ))}
                        </ul>
                    </div>
                </ExpandingButton>

                {/* Location Button */}
                <ExpandingButton
                style="location"
                className="mr-3"
                iconSrc="https://www.svgrepo.com/show/505193/prison.svg"
                >
                    <div className="p-3 flex flex-col gap-1 bg-gray-200 rounded-sm shadow-sm shadow-black m-1.5">
                        <h4 className="font-semibold text-lg">Регіон: {country.location.universe.name}</h4>
                        <p className="text-xs text-gray-600">Підвладні регіони: {country.location.regions.join(", ")}</p>
                        <p className="text-xs text-gray-600">Координати столиці: {country.location.coordinates}</p>
                    </div>
                </ExpandingButton>

                {/* Institutes Button */}
                <ExpandingButton
                style="institutes"
                iconSrc="https://www.svgrepo.com/show/505179/online-notarization.svg"
                >
                    <div className="p-3 flex flex-col gap-2 bg-gray-200 rounded-sm shadow-sm shadow-black m-1.5">
                        <h4 className="font-semibold text-lg">Реалізовані інститути</h4>
                        <ul className="list-disc list-inside text-sm max-h-40 overflow-auto">
                        {country.implementations.map((impl) => (
                            <li key={impl.id}>
                            {impl.institute.name} ({impl.currentRate}%)
                            </li>
                        ))}
                        </ul>
                    </div>
                </ExpandingButton>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryList;