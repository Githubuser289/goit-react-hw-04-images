import Searchbar from './Searchbar/Searchbar';

function App() {
  const handleSubmit = evt => {
    evt.preventDefault();
    const txt = evt.target[1].value;
    if (txt === '') return;

    document.getElementsByTagName('form')[0].reset();
  };

  return (
    <>
      <Searchbar submitCallback={handleSubmit} />
    </>
  );
}

export default App;
