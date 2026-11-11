import { useEffect, useRef, useState } from 'react';

export default function FilterDropdown({ label, selected, children }) {
  const [open, setOpen] = useState(false);
  const dropdown = useRef(null);

  function close() {
    setOpen(false);
    // Send focus back to the trigger
    dropdown.current?.querySelector('.dropdown-trigger')?.focus();
  }

  // Close on a click outside
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event) {
      if (!dropdown.current.contains(event.target)) setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div
      className="filter-dropdown"
      ref={dropdown}
      onBlur={event => {
        // Close when focus leaves the dropdown
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <button
        className="dropdown-trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={selected ? `${label}: ${selected}` : label}
        onClick={() => setOpen(current => !current)}
      >
        {selected || label}
      </button>
      {open && <div className="filter-panel">{children(close)}</div>}
    </div>
  );
}
