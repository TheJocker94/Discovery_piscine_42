function Product({ character , name}) {
  return (
    <div class="text-center">
      <h1 class="text-5xl text-orange-500 font-bold">Character ID {character.id}</h1>
      Name :{character.name}
      <img src={character.image} class="mx-auto p-10"/>
      Species :{character.species}
    </div>
  );
}
export async function getServerSideProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();
  return { props: { character } };
}
export default Product;
