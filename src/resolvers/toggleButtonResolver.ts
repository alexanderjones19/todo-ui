import Resolver from '../models/Resolver';
import { GET_BUTTON_TOGGLE } from '../queries/buttonToggle';

const toggleButton: Resolver = (_root, variables, { cache }) => {
  const query = cache.readQuery({query: GET_BUTTON_TOGGLE});
  const data = { buttonToggle: !query.buttonToggle };
  cache.writeData({ data });
};

export default toggleButton;