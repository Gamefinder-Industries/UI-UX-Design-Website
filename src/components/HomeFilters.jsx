import { useState } from 'react';
import { games, maxPrice } from '../games';
import FilterDropdown from './FilterDropdown';

const genres = [...new Set(games.map(game => game.genre))].sort();

const dropdowns = [
  {
    name: 'players',
    label: 'Party size',
    options: [['', 'Any party size'], ['1', 'Solo'], ['2', '2 players'], ['3', '3 players'], ['4', '4 players'], ['5', '5 or more players']],
  },
  { name: 'wishlist', label: 'Wishlist', options: [['', 'All games'], ['saved', 'Wishlisted only']] },
];

function CostOptions({ freeOnly, max, onChange }) {
  // Free only disables the price controls
  function setMax(value) {
    // Skip empty or NaN input, clamp the rest to the range
    if (Number.isNaN(value)) return;
    const clamped = Math.min(maxPrice, Math.max(0, value));
    onChange({ freeOnly, max: clamped });
  }

  return (
    <div className="cost-options">
      <label className="cost-free">
        <input
          type="checkbox"
          checked={freeOnly}
          onChange={event => onChange({ freeOnly: event.target.checked, max })}
        />
        Free only
      </label>
      <label className="cost-max" htmlFor="cost-max-input">Max price</label>
      <div className="cost-row">
        <input
          type="range"
          aria-label="Maximum price"
          min="0"
          max={maxPrice}
          step="1"
          value={max}
          disabled={freeOnly}
          onChange={event => setMax(Number(event.target.value))}
        />
        <span className="cost-amount">
          $
          <input
            id="cost-max-input"
            type="number"
            aria-label="Maximum price in dollars"
            min="0"
            max={maxPrice}
            step="1"
            value={max}
            disabled={freeOnly}
            onChange={event => setMax(Number(event.target.value))}
          />
        </span>
      </div>
    </div>
  );
}

function GenreOptions({ selected, onToggle }) {
  return (
    <div className="genre-options" role="group" aria-label="Filter by genre">
      {genres.map(genre => (
        <label className="genre-option" key={genre}>
          <input
            type="checkbox"
            checked={selected.includes(genre)}
            onChange={() => onToggle(genre)}
          />
          {genre}
        </label>
      ))}
    </div>
  );
}

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

// Default the slider to the full range
function currentMax(filters) {
  return filters.maxPrice ?? maxPrice;
}

function costLabel(filters) {
  if (filters.freeOnly) return 'Free';
  if (filters.maxPrice != null && filters.maxPrice < maxPrice) return `Up to $${filters.maxPrice}`;
  return '';
}

function genreLabel(selected) {
  if (selected.length === 0) return '';
  if (selected.length === 1) return selected[0];
  return `${selected.length} genres`;
}

export default function HomeFilters({ filters, onChange }) {
  const rating = filters.stars || 0;

  function setFilter(name, value) {
    onChange(current => ({ ...current, [name]: value }));
  }

  const selectedGenres = filters.genres || [];

  function setCost({ freeOnly, max }) {
    onChange(current => ({
      ...current,
      freeOnly,
      // Full range means no price limit
      maxPrice: max >= maxPrice ? undefined : max,
    }));
  }

  function toggleGenre(genre) {
    onChange(current => {
      const chosen = current.genres || [];
      const next = chosen.includes(genre)
        ? chosen.filter(name => name !== genre)
        : [...chosen, genre];
      return { ...current, genres: next };
    });
  }

  return (
    <form className="home-filters" aria-label="Filter games" onSubmit={event => event.preventDefault()}>
      <strong>Browse by:</strong>
      <FilterDropdown label="Cost" selected={costLabel(filters)}>
        {() => (
          <CostOptions
            freeOnly={filters.freeOnly || false}
            max={currentMax(filters)}
            onChange={setCost}
          />
        )}
      </FilterDropdown>
      <FilterDropdown label="Genre" selected={genreLabel(selectedGenres)}>
        {() => <GenreOptions selected={selectedGenres} onToggle={toggleGenre} />}
      </FilterDropdown>
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
