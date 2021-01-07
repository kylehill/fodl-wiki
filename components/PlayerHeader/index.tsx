import React from "react";
import { Player } from "types/player";

type Props = {
  player: Player;
};

const PlayerHeader = ({ player }: Props) => {
  return (
    <div>
      <div>{player.name}</div>
      <div>{"★".repeat(player.stars)}</div>
      <div>{player.location}</div>
      <div>{player.darts}</div>
      <div>{player.hashtag}</div>
    </div>
  );
};

export default PlayerHeader;
