import Link from 'next/link';

function Home({ characters }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl text-green-500">Rick and Morty!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters && characters.map((character) => (
          <div key={character.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/${character.id}`} legacyBehavior>
              <a>
                <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-gray-800 text-lg text-center font-semibold">{character.name}</h2>
                  <p className="text-gray-500 text-center">{character.species}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();
  const characters = data.results;
  return { props: { characters } };
}

export default Home;
