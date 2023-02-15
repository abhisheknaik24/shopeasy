import './Filter.css';

const Filter = ({ count, setCount }) => {
  return (
    <div className='filter-card'>
      <h3 className='filter-title'>Filter</h3>
      <label className='filter-label'>Price :</label>
      <p className='filter-price'>upto &#8377;{count}</p>
      <input
        type='range'
        className='filter-range-input'
        min='0'
        max='10000'
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
    </div>
  );
};

export default Filter;
