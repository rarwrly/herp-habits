const Form = () => {
    const [selectedOption, setSelectedOption] = useState(1);  
    
    return (
      <div>
        <p>selected option: {selectedOption}</p>
        <form>
          <select
            onChange={(event) => setSelectedOption(event.target.value)}
            value={selectedOption}
            defaultValue={selectedOption}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </form>
      </div>
    );
  };