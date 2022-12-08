import { Solution } from "../solution.js";

export default class S extends Solution {
  solve() {
    const stream = this.input[0].split("");

    const packetSize = 14;
    let packet = [];
    let packetEnd = 0;

    for (let i = 0; i < stream.length; i++) {
      const byte = stream[i];
      packetEnd = i;

      if (packet.length >= packetSize) break;

      const byteI = packet.indexOf(byte);
      if (byteI > -1) {
        packet = packet.slice(byteI + 1);
      }

      packet.push(byte);
    }

    console.log(`packet ends at index: ${packetEnd}`);
  }
}
