interface DiaryType {
  params: { id: string }
}

export default function diary({ params: { id } }: DiaryType) {
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}