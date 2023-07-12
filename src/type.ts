
import Text from './block/text';
import Polyphone from './block/polyphone';
import Pause from './block/pause';
import Phraselink from './block/phraselink';
import Changespeedstart from './block/changespeedstart';
import Changespeedend from './block/changespeedend';
import Numberread from './block/numberread';

export const Deltas = {
  text: Text,
  polyphone: Polyphone,
  pause: Pause,
  phraselink: Phraselink,
  changespeedstart: Changespeedstart,
  changespeedend: Changespeedend,
  numberread: Numberread,
};
type deltaType = keyof typeof Deltas;
export interface Delta {
  type: deltaType;
  text: string;
  desc?: string;
  dom?: Text | HTMLSpanElement;
}
