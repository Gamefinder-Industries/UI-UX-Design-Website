import { useRef } from 'react';

export default function FilterDropdown({ label, selected, children }) {
  const dropdown = useRef(null);

  function close() {
    const menu = dropdown.current;
    // Return focus to the dropdown button before hiding its options.
    menu.querySelector('summary').focus();
    menu.open = false;
  }

  return (
    <details
      className="filter-dropdown"
      name="home-filters"
      ref={dropdown}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={event => {
        if (event.key === 'Escape' && dropdown.current.open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <summary aria-label={selected ? `${label}: ${selected}` : label}>
        {selected || label}
      </summary>
      <div className="filter-panel">{children(close)}</div>
    </details>
  );
}
