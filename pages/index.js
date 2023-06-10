import Link from 'next/link';

function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <p>Click <Link href="/13" legacyBehavior><a>here</a></Link> to learn more about our product.</p>
      <p>Click <Link href="/50" legacyBehavior><a>here</a></Link> to learn more about our product.</p>
    </div>
  );
}

export default Home;