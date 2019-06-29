export default interface FormProps<D> {
  onSubmit: (data: D, event: React.FormEvent<HTMLElement>) => void
}