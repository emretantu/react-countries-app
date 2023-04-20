import './App.css';
import Aside from './components/Aside/Aside';
import Content from './components/Content/Content';

function App() {
  return (
    <main className='main'>
      <aside className='aside'>
        <Aside />
        {/* Mini navbar */}
        {/* Search / filter */}
        {/* Country cards */}
      </aside>
      <section className='content'>
        <Content />
        {/* Bg-img */}
        {/* Title */}
        {/* Content ... */}
      </section>
    </main>
  );
}

export default App;
