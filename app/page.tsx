import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { Carcard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer?.toString() || "",
    year: searchParams.year ? Number(searchParams.year) : 2022,
    fuel: searchParams.fuel?.toString() || "",
    limit: searchParams.limit ? Number(searchParams.limit) :0 ,
    model: searchParams.model?.toString() || "",
  });

  console.log("Fetched cars:", allCars);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <Carcard key={car.id || index} car={car} />
              ))}
            </div>
            <ShowMore
  pageNumber={Number(searchParams.limit) || 1} // ✅ Convert to number
  isNext={(Number(searchParams.limit) || 1) > allCars.length} // ✅ Convert before comparison
/>

          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
