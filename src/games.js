// These are sample prices for the prototype. Steam shows the current price.
export const games = [
  {
    id: 'spiritfarer', steamId: 972660, name: 'Spiritfarer', genre: 'Cozy', players: 2,
    price: 8.99, original: 29.99, rating: 4.8,
    description: 'Ferry spirits across the sea, build rooms on your boat, and grow food for your passengers. A second player can join locally as Daffodil the cat.',
  },
  {
    id: 'short-hike', steamId: 1055540, name: 'A Short Hike', genre: 'Adventure', players: 1,
    price: 5.99, original: 7.99, rating: 4.7,
    description: 'Follow the trails up Hawk Peak or leave the path to fish, glide, and meet other hikers. You can explore the island at your own pace.',
  },
  {
    id: 'celeste', steamId: 504230, name: 'Celeste', genre: 'Platformer', players: 1,
    price: 4.99, original: 19.99, rating: 4.9,
    description: 'Help Madeline climb Celeste Mountain. Each room is a short platforming challenge built around jumping, climbing, and a midair dash.',
  },
  {
    id: 'stardew', steamId: 413150, name: 'Stardew Valley', genre: 'Cozy', players: 8,
    price: 11.99, original: 14.99, rating: 4.8,
    description: 'Build a farm together. Split up the planting, fishing, and mining, then pool your resources to improve the farm.',
  },
  {
    id: 'overcooked', steamId: 728880, name: 'Overcooked! 2', genre: 'Action', players: 4,
    price: 6.24, original: 24.99, rating: 4.6,
    description: 'Work through a dinner rush in kitchens that move around you. Call out orders and divide up chopping, cooking, and washing dishes.',
  },
  {
    id: 'plateup', steamId: 1599600, name: 'PlateUp!', genre: 'Strategy', players: 4,
    price: 19.99, rating: 4.6,
    description: 'Run a restaurant with friends. Arrange the kitchen between shifts and keep customers moving as the menu grows.',
  },
  {
    id: 'palia', steamId: 2707930, name: 'Palia', genre: 'Cozy', players: 4,
    price: 0, rating: 4.5,
    description: 'Settle into Kilima Village, collect materials, and furnish your own home. Spend a relaxed evening fishing or gathering with friends.',
  },
  {
    id: 'sky', steamId: 2325290, name: 'Sky: Children of the Light', genre: 'Cozy', players: 8,
    price: 0, rating: 4.6,
    description: 'Glide across seven realms, find lost spirits, and solve small puzzles with other players. The focus is on exploration and cooperation.',
  },
  {
    id: 'brawlhalla', steamId: 291550, name: 'Brawlhalla', genre: 'Fighting', players: 8,
    price: 0, rating: 4.4,
    description: 'Knock rivals off the stage in short platform fighting matches. Pick up weapons during a round to switch up your attacks.',
  },
  {
    id: 'hollow-knight', steamId: 367520, name: 'Hollow Knight', genre: 'Adventure', players: 1,
    price: 14.99, rating: 4.9,
    description: 'Explore the tunnels of Hallownest, unlock new ways to move, and take on bosses in a hand-drawn underground kingdom.',
  },
  {
    id: 'hades', steamId: 1145360, name: 'Hades', genre: 'Action', players: 1,
    price: 24.99, rating: 4.9,
    description: 'Fight your way out of the underworld as Zagreus. Try a different weapon and set of blessings each time you make a run.',
  },
  {
    id: 'portal-2', steamId: 620, name: 'Portal 2', genre: 'Puzzle', players: 2,
    price: 9.99, rating: 4.9,
    description: 'Use portals to solve test chambers. Play the story solo or work through a separate set of puzzles with a friend.',
  },
  {
    id: 'terraria', steamId: 105600, name: 'Terraria', genre: 'Adventure', players: 8,
    price: 9.99, rating: 4.8,
    description: 'Dig for resources, build a base, and explore a world full of caves and bosses. Bring friends to build and fight together.',
  },
  {
    id: 'unpacking', steamId: 1135690, name: 'Unpacking', genre: 'Cozy', players: 1,
    price: 19.99, rating: 4.7,
    description: 'Unpack boxes and find a place for each item as you move through the rooms of someone’s life.',
  },
  {
    id: 'deep-rock', steamId: 548430, name: 'Deep Rock Galactic', genre: 'Action', players: 4,
    price: 29.99, rating: 4.8,
    description: 'Team up as space miners, gather minerals, and fend off bugs as you work your way back to the drop pod.',
  },
];

export function discount(game) {
  return game.original ? Math.round((1 - game.price / game.original) * 100) : 0;
}
