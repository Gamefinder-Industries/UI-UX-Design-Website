import { useState } from 'react';
import { games } from '../games';
import FilterDropdown from './FilterDropdown';

const genres = [...new Set(games.map(game => game.genre))].sort();

const dropdowns = [
  { name: 'cost', label: 'Cost', options: [['', 'Any price'], ['free', 'Free'], ['paid', 'Paid']] },
  { name: 'genre', label: 'Genre', options: [['', 'All genres'], ...genres.map(genre => [genre, genre])] },
  {
    name: 'players',
    label: 'Party size',
    options: [['', 'Any party size'], ['1', 'Solo'], ['2', '2 players'], ['3', '3 players'], ['4', '4 players'], ['5', '5 or more players']],
  },
  { name: 'wishlist', label: 'Wishlist', options: [['', 'All games'], ['saved', 'Wishlisted only']] },
];

function RatingOptions({ rating, onSelect }) {
  // Hover previews a rating. Clicking applies the filter.
  const [preview, setPreview] = useState(null);
  const shownRating = preview ?? rating;

  return (
    <>
      <strong>Minimum rating</strong>
      <div className="rating-stars" role="group" aria-label="Choose a minimum star rating" onPointerLeave={() => setPreview(null)}>
        {[1, 2, 3, 4, 5].map(star => {
          const fill = shownRating >= star ? 'full' : shownRating >= star - 0.5 ? 'half' : 'empty';

          return (
            <div className="rating-star" key={star}>
              <span aria-hidden="true">☆</span>
              <span className={`rating-star-fill ${fill}`} aria-hidden="true">★</span>
              {[star - 0.5, star].map(value => (
                <button
                  className="rating-hit-area"
                  key={value}
                  type="button"
                  aria-label={`${value} stars or higher`}
                  aria-pressed={rating === value}
                  onPointerEnter={() => setPreview(value)}
                  onFocus={() => setPreview(value)}
                  onBlur={() => setPreview(null)}
                  onClick={() => onSelect(value)}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="rating-footer">
        <span>{shownRating === 0 ? 'Any rating' : `${shownRating} stars and up`}</span>
        <button type="button" onClick={() => onSelect(0)}>Clear</button>
      </div>
    </>
  );
}

export default function HomeFilters({ filters, onChange }) {
  const rating = filters.stars || 0;

  function setFilter(name, value) {
    onChange(current => ({ ...current, [name]: value }));
  }

  return (
    <form className="home-filters" aria-label="Filter games" onSubmit={event => event.preventDefault()}>
      <strong>Browse by:</strong>
      {dropdowns.map(({ name, label, options }) => {
        const value = filters[name] || '';
        const selected = value ? options.find(option => option[0] === value)?.[1] : '';

        return (
          <FilterDropdown key={name} label={label} selected={selected}>
            {close => options.map(([option, text]) => (
              <button
                className="filter-option"
                key={option}
                type="button"
                aria-pressed={value === option}
                onClick={() => {
                  setFilter(name, option);
                  close();
                }}
              >
                {text}
              </button>
            ))}
          </FilterDropdown>
        );
      })}
      <FilterDropdown label="Rating" selected={rating ? `★ ${rating}+` : ''}>
        {close => (
          <RatingOptions
            rating={rating}
            onSelect={value => {
              setFilter('stars', value);
              close();
            }}
          />
        )}
      </FilterDropdown>
      <input
        type="search"
        aria-label="Search games"
        placeholder="Search games..."
        value={filters.search || ''}
        onChange={event => setFilter('search', event.target.value)}
      />
    </form>
  );
}
