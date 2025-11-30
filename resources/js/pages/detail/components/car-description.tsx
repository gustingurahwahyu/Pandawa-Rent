interface Props {
  description: string;
}

export default function CarDescription({ description }: Props) {
  return (
    <div className="rounded-xl bg-white-background px-12 py-8 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-black">Car Details</h3>

      <p className="leading-relaxed text-gray">{description}</p>
    </div>
  );
}
