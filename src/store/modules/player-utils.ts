import { PlayerData } from '@/core/entities/player';

const numberOfPlayers = 2;

const generatePlayers = (): PlayerData[] => Array.from(
  Array(numberOfPlayers),
  (rowItem, playerNumber) => ({
    id: playerNumber, name: `Player ${playerNumber + 1}`, score: 0, color: playerNumber === 0 ? 'black' : 'red',
  }),
);

export default {
  generatePlayers,
};
