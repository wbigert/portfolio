
interface ApplicantInfoLineProps {
  label: string,
  value: string | undefined,
  fallback: string
}

export default function ApplicantInfoLine({ label, value, fallback }: ApplicantInfoLineProps) {

  if (typeof (label) !== 'string' || typeof (fallback) !== 'string' || (value && typeof (value) !== 'string')) {
    return null
  }

  return (
    <div className="fs-5 mb-1">
      <span>{label}:</span> <span className="bg-light fst-italic">{value || fallback}</span>
    </div>
  )
}
