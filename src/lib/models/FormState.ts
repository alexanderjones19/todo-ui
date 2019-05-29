import FormData from './FormData';

export default interface FormState<D extends FormData> {
  inputs: D;
}