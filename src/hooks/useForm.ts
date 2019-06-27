import { useState } from "react";

export default <D>(onSubmit: Function) => {
  const [inputs, setInputs] = useState<D | {}>({});

  const handleInputChange = (event: React.FormEvent<HTMLElement>) => {
    const inputChange = {...inputs};
    const target = event.target as HTMLInputElement;
    inputChange[target.name] = target.value;
    setInputs(inputChange);
  }

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    onSubmit(event, inputs);
  }

  return {data: inputs, handleInputChange, handleSubmit};
}