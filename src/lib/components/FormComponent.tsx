import React, { Component } from 'react';

import FormProps from '../models/FormProps';
import FormState from '../models/FormState';
import FormData from '../models/FormData';

export default class FormComponent<P extends FormProps<D>, S extends FormState<D>, D extends FormData> extends Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      inputs: {}
    } as Readonly<S>;
  }

  onInputChange(event: React.FormEvent<HTMLElement>) {
    const inputChange = {...this.state.inputs};
    const target = event.target as HTMLInputElement;
    inputChange[target.name] = target.value;
    this.setState({inputs: inputChange});
  }

  handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    this.props.onSubmit(event, this.state.inputs);
  }
}