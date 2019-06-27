export default interface FormProps<D> {
  onSubmit: (event: React.FormEvent<HTMLElement>, data: D) => void
}