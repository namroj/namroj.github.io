export type ExperienceItemType = {
  entity: { name: string; url: string }
  location: string
  interval: string
  positions: {
    title: string
    interval: string
    extract: string
    description: string
  }[]
  tags: string[]
}

export default function Experience({ experienceData }: Readonly<{ experienceData: ExperienceItemType[] }>) {
  return (
    <ul>
      {experienceData.map((item, index) => (
        <li key={index}>
          <article>
            <h3>
              <a href={item.entity.url} target='_blank'>
                {item.entity.name}
              </a>
            </h3>
            <p>{item.location}</p>
            <p>{item.interval}</p>

            {item.positions.map((position, index) => (
              <div key={index}>
                <h4>{position.title}</h4>
                <p>{position.interval}</p>
                <p>{position.extract}</p>
                <p>{position.description}</p>
              </div>
            ))}
            <ul>
              {item.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  )
}
